#!/bin/bash
# --- Jxion: Final Production Build & Packaging Script ---
# Run this in Arch Linux terminal at repo root

set -e  # Exit on error

echo "🚀 Starting Jxion Framework Production Build & Packaging"
echo "=================================================="

# --- 1. Production Build ---
echo ""
echo "📦 Step 1: Building production applications..."
echo "--------------------------------------------"

# Build noir-crafted (SvelteKit)
echo "Building noir-crafted..."
npm run build:noir-crafted || {
    echo "❌ noir-crafted build failed"
    exit 1
}

# Build noir-admin (React)
echo "Building noir-admin..."
npm run build:noir-admin || {
    echo "❌ noir-admin build failed"
    exit 1
}

echo "✅ Production builds completed"
echo ""

# --- 2. Prepare Submission Package ---
echo "📋 Step 2: Preparing submission package..."
echo "--------------------------------------------"

SUBMISSION_DIR="submission-package/jxion-framework"

# Clean previous packages
rm -rf submission-package

# Create directory structure
mkdir -p "$SUBMISSION_DIR"

# Copy built applications
echo "Copying production builds..."
if [ -d "dist/apps/noir-crafted" ]; then
    cp -r dist/apps/noir-crafted/ "$SUBMISSION_DIR/noir-crafted-production"
else
    echo "⚠️  Warning: dist/apps/noir-crafted not found"
fi

if [ -d "dist/apps/noir-admin" ]; then
    cp -r dist/apps/noir-admin/ "$SUBMISSION_DIR/noir-admin-production"
else
    echo "⚠️  Warning: dist/apps/noir-admin not found"
fi

# Copy documentation files
echo "Copying documentation..."
cp REACT_DEVELOPER_CASE_STUDY_SUBMISSION_COMPREHENSIVE.md "$SUBMISSION_DIR/" 2>/dev/null || echo "⚠️  Case study not found"
cp README.md "$SUBMISSION_DIR/" 2>/dev/null || echo "⚠️  README not found"
cp package.json "$SUBMISSION_DIR/" 2>/dev/null || echo "⚠️  package.json not found"

# Copy additional docs if they exist
[ -f MASTER_PROMPT.md ] && cp MASTER_PROMPT.md "$SUBMISSION_DIR/"
[ -f QUICK_REFERENCE.md ] && cp QUICK_REFERENCE.md "$SUBMISSION_DIR/"
[ -f PROMPT_USAGE_GUIDE.md ] && cp PROMPT_USAGE_GUIDE.md "$SUBMISSION_DIR/"
[ -f apps/noir-crafted/BRAND_GUIDE_SOCIAL_MEDIA.md ] && \
    cp apps/noir-crafted/BRAND_GUIDE_SOCIAL_MEDIA.md "$SUBMISSION_DIR/"

echo "✅ Package contents prepared"
echo ""

# --- 3. Create Timestamped ZIP Archive ---
echo "📦 Step 3: Creating submission archive..."
echo "--------------------------------------------"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
SUBMISSION_FILE="jxion-framework-submission-${TIMESTAMP}.zip"

cd submission-package
zip -r "../${SUBMISSION_FILE}" jxion-framework/ -q
cd ..

# Generate SHA256 checksum
sha256sum "${SUBMISSION_FILE}" > "${SUBMISSION_FILE}.sha256"

echo "✅ Submission package created: ${SUBMISSION_FILE}"
echo "🔐 Checksum file: ${SUBMISSION_FILE}.sha256"
echo ""

# --- 4. Display Package Contents ---
echo "📋 Package Contents:"
echo "--------------------------------------------"
unzip -l "${SUBMISSION_FILE}" | head -30
echo ""
echo "📊 Package Size:"
du -sh "${SUBMISSION_FILE}"
echo ""
echo "🔐 SHA256 Checksum:"
cat "${SUBMISSION_FILE}.sha256"
echo ""
echo "✅ Production build and packaging complete!"
echo "=================================================="
echo ""
echo "📦 Submission file ready: ${SUBMISSION_FILE}"
echo "📍 Location: $(pwd)/${SUBMISSION_FILE}"

