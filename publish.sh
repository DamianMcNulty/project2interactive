#!/bin/sh

DIRECTORY="build"
BRANCH="gh-pages"
CURRENT_BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

# Check if the environment is ready for publishing ===========================
if [ "$CURRENT_BRANCH" != "master" ]
then
    echo "⚠️  Please run this script from master branch"
    exit 1;
fi

if [[ $(git status -s) ]]
then
    echo "⚠️  Please commit any pending changes."
    exit 1;
fi

echo "backup build content"
mkdir "$DIRECTORY-tmp"
cp -r $DIRECTORY/* "$DIRECTORY-tmp/"

echo "Deleting build"
rm -rf $DIRECTORY
mkdir $DIRECTORY
git worktree prune
rm -rf .git/worktrees/$DIRECTORY/

echo "Checking out $BRANCH branch into build"
git worktree add -B $BRANCH $DIRECTORY

echo "Removing existing files"
rm -rf $DIRECTORY/*

echo "Generating build using the backup"
cp -r "$DIRECTORY-tmp"/* $DIRECTORY/
rm -rf "$DIRECTORY-tmp"

echo "Updating $BRANCH branch"
cd $DIRECTORY && git add --all && git commit -m "Publishing to $BRANCH (publish.sh)"
git push --force origin $BRANCH --tags
