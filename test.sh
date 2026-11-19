for path in robots.txt sitemap.xml 3d-printers; do
  echo "=== $path ==="
  curl -sSL -A "Googlebot" \
    -o /dev/null \
    -w "HTTP %{http_code} | Content-Type %{content_type}\n" \
    "https://www.inspectmesh.com/$path"
done