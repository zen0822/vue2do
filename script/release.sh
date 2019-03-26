#!/bin/sh
CURRENT_VERSION=`npm view vue2do version`
echo "Current vue2do version is $CURRENT_VERSION"
set -o errexit

if [[ -z $1 ]]; then
  echo "Enter new version: "
  read VERSION
else
  VERSION=$1
fi

read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r
echo

if [[ $VERSION == $CURRENT_VERSION ]]; then
  echo "The version of '$VERSION' and the online package version cannot be equal."
  exit
else
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Releasing $VERSION ..."

    # build production
    npm run prod

    # commit
    git add -A
    git commit -m "[build] $VERSION"
    git pull

    npm version $VERSION --message "[release] $VERSION"

    # publish
    git tag -a "v$VERSION" -m "[release] $VERSION"
    git push
    if [[ -z $RELEASE_TAG ]]; then
      npm publish
    else
      npm publish --tag $RELEASE_TAG
    fi
  fi
fi