#!/usr/bin/env bash
set -euo pipefail

readonly build_directory="$1"
readonly bucket_uri="$2"
readonly distribution_id="$3"
readonly immutable_cache_control='public, max-age=31536000, immutable'
readonly mutable_cache_control='no-cache, max-age=0, must-revalidate'

# Never add --delete here: open tabs can still request an older hashed chunk.
#
# Only build-emitted, content-addressed files are immutable: Angular's
# chunk-/main-/polyfills-/worker-/styles- outputs (or the fingerprint script's
# main./styles. renames) and the builder's media/ directory. Hand-named public
# files such as diagrams/*.svg, favicons and app icons keep stable URLs whose
# contents can change, so a broader "long name before the extension" pattern
# would cache them for a year. scripts/deploy-asset-classification.test.ts
# keeps this list in step with the build output.
is_hashed_asset() {
  [[ "$1" =~ ^(chunk|main|polyfills|worker|styles)[-.][[:alnum:]_]{8,}\.(js|css)$ ]] ||
    [[ "$1" =~ ^media/[^/]+$ ]]
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
for file in "${files[@]}"; do
  relative_path="${file#"$build_directory"/}"
  if ! is_hashed_asset "$relative_path" && [[ "$relative_path" != *.html ]]; then
    upload_file "$relative_path" "$mutable_cache_control"
  fi
done

# Route documents are deliberately last: they can safely reference new assets.
for file in "${files[@]}"; do
  relative_path="${file#"$build_directory"/}"
  if [[ "$relative_path" == *.html ]]; then
    upload_file "$relative_path" "$mutable_cache_control"
  fi
done

# Route documents revalidate: the default behavior's managed CachingOptimized
# policy honours this no-cache header for at most its 1-second minimum TTL. Every
# referenced JS and CSS entry asset is content-addressed by the build, so a
# new deployment uses new URLs without CloudFront invalidations.
