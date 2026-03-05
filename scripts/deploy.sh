#!/bin/bash

# Configuration
REPO_URL=$(gh repo view --json url -q .url)
DIST_DIR="dist"

echo "Building application..."
npm run build

if [ ! -d "$DIST_DIR" ]; then
    echo "Error: Build directory $DIST_DIR not found."
    exit 1
fi

echo "Deploying to GitHub Pages..."
cd "$DIST_DIR"

# Initialize a temporary git repo in the build folder
git init
git checkout -b gh-pages
git add .
git commit -m "Deploy to GitHub Pages"

# Push the build to the gh-pages branch of the specified repository
# Using the repo URL directly to avoid remote issues in the temporary repo
git push --force "$REPO_URL" gh-pages

echo "Cleaning up..."
cd ..

# Ensure GitHub Pages is enabled and pointing to the right branch
gh repo edit --enable-pages --pages-branch gh-pages

echo "Deployment complete! Your site should be available at: https://$(gh repo view --json owner -q .owner.login).github.io/lesson-builder-demo/"
