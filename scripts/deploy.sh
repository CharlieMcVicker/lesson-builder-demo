#!/bin/bash

# Configuration
REPO_URL=$(gh repo view --json sshUrl -q .sshUrl)
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

# Push the build to the gh-pages branch using SSH for authentication
git push --force "$REPO_URL" gh-pages

echo "Cleaning up..."
cd ..

echo "Deployment complete! Your site should be live at: https://$(gh repo view --json owner -q .owner.login).github.io/lesson-builder-demo/"
