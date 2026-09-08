#!/usr/bin/env bash
set -euo pipefail

readonly build_directory="$1"
readonly bucket_uri="$2"
readonly distribution_id="$3"
readonly immutable_cache_control='public, max-age=31536000, immutable'
readonly mutable_cache_control='no-cache, max-age=0, must-revalidate'

# Never add --delete here: open tabs can still request an older hashed chunk.
is_hashed_asset() {
  [[ "$1" =~ (^|[-.])[[:alnum:]_-]{8,}\.(js|css|woff2?|ttf|otf|svg|png|jpe?g|webp|avif|ico)$ ]]
}

upload_file() {
  local relative_path="$1"
  local cache_control="$2"
  aws s3 cp "$build_directory/$relative_path" "$bucket_uri/$relative_path" \
    --cache-control "$cache_control"
}

mapfile -d '' -t files < <(find "$build_directory" -type f -print0 | LC_ALL=C sort -z)

# Upload new content-addressed assets before anything can reference them.
for file in "${files[@]}"; do
  relative_path="${file#"$build_directory"/}"
  if is_hashed_asset "$relative_path"; then
    upload_file "$relative_path" "$immutable_cache_control"
  fi
done

# Stable names can change between deployments, so they must revalidate.
mutable_paths=()
for file in "${files[@]}"; do
  relative_path="${file#"$build_directory"/}"
  if ! is_hashed_asset "$relative_path" && [[ "$relative_path" != *.html ]]; then
    upload_file "$relative_path" "$mutable_cache_control"
    mutable_paths+=("/$relative_path")
  fi
done

# Route documents are deliberately last: they can safely reference new assets.
for file in "${files[@]}"; do
  relative_path="${file#"$build_directory"/}"
  if [[ "$relative_path" == *.html ]]; then
    upload_file "$relative_path" "$mutable_cache_control"
  fi
done

mapfile -t invalidation_paths < <(
  find "$build_directory" -name index.html -printf '/%P\n' |
    sed 's#^/index.html$#/#' |
    LC_ALL=C sort
)
# Invalidate every mutable object. A stable main.js or styles.css can contain a
# newer route registry than an already-cached copy; leaving it at an edge can
# make Angular replace freshly prerendered HTML with its client-side 404 page.
# Older hashed assets intentionally remain untouched for already-open tabs.
invalidation_paths+=(/index.csr.html)
invalidation_paths+=("${mutable_paths[@]}")
invalidation_id="$(
  aws cloudfront create-invalidation \
    --distribution-id "$distribution_id" \
    --paths "${invalidation_paths[@]}" \
    --query 'Invalidation.Id' \
    --output text
)"
aws cloudfront wait invalidation-completed \
  --distribution-id "$distribution_id" \
  --id "$invalidation_id"
