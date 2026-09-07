#!/usr/bin/env bash
set -euo pipefail

readonly build_directory="$1"
readonly bucket="$2"
readonly retention_days="${3:-30}"
readonly current_assets_file="$(mktemp)"
readonly cutoff="$(date -u -d "${retention_days} days ago" '+%Y-%m-%dT%H:%M:%SZ')"

trap 'rm -f "$current_assets_file"' EXIT
find "$build_directory" -type f \( -name '*.js' -o -name '*.css' \) -printf '%P\n' |
  LC_ALL=C sort > "$current_assets_file"

aws s3api list-objects-v2 \
  --bucket "$bucket" \
  --query "Contents[?LastModified<=\`${cutoff}\`].Key" \
  --output text |
  tr '\t' '\n' |
  while IFS= read -r key; do
    case "$key" in
      *.js | *.css)
        if grep -Fxq "$key" "$current_assets_file"; then
          continue
        fi
        aws s3api delete-object --bucket "$bucket" --key "$key"
        ;;
    esac
  done
