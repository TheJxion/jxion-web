#!/bin/bash
# Workaround script for Angular 18 index.html generation bug
# This script builds the Angular app and manually creates index.html

set -e

echo "🔨 Building Angular app..."
ng build || true  # Continue even if index generation fails

# Check if bundles were generated
if [ ! -f "dist/main.*.js" ]; then
  echo "❌ Build failed - no bundles generated"
  exit 1
fi

echo "📝 Manually generating index.html..."

# Get the hash filenames
RUNTIME=$(ls dist/runtime.*.js | xargs basename)
POLYFILLS=$(ls dist/polyfills.*.js | xargs basename)
MAIN=$(ls dist/main.*.js | xargs basename)
STYLES=$(ls dist/styles.*.css 2>/dev/null | xargs basename || echo "")

# Generate index.html
cat > dist/index.html << EOF
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Jxion Angular</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
EOF

# Add styles if they exist
if [ -n "$STYLES" ]; then
  echo "  <link rel=\"stylesheet\" href=\"$STYLES\">" >> dist/index.html
fi

cat >> dist/index.html << EOF
</head>
<body>
  <jx-root></jx-root>
  <script src="$RUNTIME" type="module"></script>
  <script src="$POLYFILLS" type="module"></script>
  <script src="$MAIN" type="module"></script>
</body>
</html>
EOF

echo "✅ Build complete with workaround!"
echo "📦 Output: dist/index.html"

