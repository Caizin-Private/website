#!/bin/bash
# Netlify calls this before every triggered build.
# Exit 0 = skip the build. Exit 1 (non-zero) = proceed with the build.
# This keeps normal pushes from consuming Netlify build minutes -
# a build only runs when the latest commit message contains "[deploy]".

if git log -1 --pretty=%B | grep -q '\[deploy\]'; then
  echo "[deploy] tag found in commit message — proceeding with build."
  exit 1
else
  echo "No [deploy] tag in commit message — skipping build."
  exit 0
fi
