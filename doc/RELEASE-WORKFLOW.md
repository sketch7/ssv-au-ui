# Release workflow
In order to release follow the following procedure.

## Machine Setup
In order for this to work first need to setup github through cmd

### Auth to GitHub
Authenticate to github via username/password or SSH.

#### Username/Password Auth
- run `git config --global credential.helper wincred`
 - this will persist the credentials (for windows)
- Trigger push command e.g.

```
git push origin develop
```
 - Auth to github by providing username and password/token

### Auth to npm
Before attempting to publish make sure you are logged in using the sketch7 account for npm.
Verify by running `npm publish`


# Create new Release

## New RC Release
RC release process
 - Checkout `develop` branch (or release branch)
 - Run `gulp publish`

## New Stable Release
Stable release process
 - Checkout `master`
 - Get latest `git pull`
 - Merge `develop => master`
 - Run `gulp publish --rel --bump major|minor|patch (default: patch)`
 - Merge `master => develop`

Or use the below to automate it. *note* change `gulp publish --rel --bump XXX` to whatever is needed.
 `npm run magic-publish`

# Gulp Release Commands
Commands in order to help release easier.

### Publish for RC
Quick publish an "RC", this will prepare release and commit.
```
gulp publish
```

### Publish Rel
Quick publish a stable release, this will prepare release and commit.
```
gulp publish --rel --bump major|minor|patch|prerelease (default: patch)
```

### Prepare-Release
Create a new build, test, bump version and generate changelog.
```
gulp prepare-release --bump major|minor|patch|prerelease (default: patch)
```

### Perform-Release
Commit, push and create tag.
```
gulp perform-release
```