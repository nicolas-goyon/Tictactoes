#!/bin/bash

# Function to update the version
update_version() {
  local branch=$1
  local version_file=$2

  # Read the current version from the json file
  local version=$(jq -r '.version' "$version_file")

  MAJOR=$(echo $version | cut -d '.' -f 1)
  MINOR=$(echo $version | cut -d '.' -f 2)
  PATCH=$(echo $version | cut -d '.' -f 3)

  # Update the version based on the branch
  if [ "$branch" == "release" ]; then
    MAJOR=$((MAJOR + 1))
    MINOR=0
    PATCH=0
  elif [ "$branch" == "develop" ]; then
    MINOR=$((MINOR + 1))
    PATCH=0
  else # For feature branches
    PATCH=$((PATCH + 1))
  fi

  NEW_VERSION="$MAJOR.$MINOR.$PATCH"

  # Update the version in the json file
  jq --arg new_version "$NEW_VERSION" '.version = $new_version' "$version_file" > tmp.$$.json && mv tmp.$$.json "$version_file"




  # # Commit and push the changes
  # git config --global user.name 'github-actions[bot]'
  # git config --global user.email 'github-actions[bot]@users.noreply.github.com'
  # git add "$version_file"
  # git commit -m "Update version to $NEW_VERSION"
  # git push
}

# Main script execution
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <branch> <version_file>"
  exit 1
fi

BRANCH=$1
VERSION_FILE=$2

update_version "$BRANCH" "$VERSION_FILE"
