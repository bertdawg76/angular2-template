#!/bin/bash

angular2-template="$1"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CLEAR='\033[0;0m'

TEMPLATE_HEAD='ng2'

# Helper methods
error() {
   echo -e "${RED}ERROR: $*$CLEAR"

}
success() {
   echo -e "${GREEN}$*$CLEAR"

}
warn() {
   echo -e "${YELLOW}WARNING: $*$CLEAR"
}

# Check for project name arg
if [[ -z "${angular2-template// }" ]]; then
    error "You must give a project name."
    error "Usage: startproject.sh <project_name>"
    exit 1
fi

# Check for directory collision
if [ -d $PWD/$angular2-template ]; then
    error "$angular2-template already exists in this directory."
    exit 1
fi

mkdir $angular2-template

git clone -b $TEMPLATE_HEAD --single-branch https://dev.izeni.net/izeni/startstudio-angular-template.git $angular2-template
cd $angular2-template
rm -rf .git

find . -type f -print0 | xargs -0 sed -i "s/angular2-template/$angular2-template/g"
yarn global add angular-cli
yarn install

# Check for missing dependencies
MISSING=()
# if ! type webpack >/dev/null 2>&1; then
#     MISSING+=('webpack')
# fi

if ! type angular-cli >/dev/null 2>&1; then
    MISSING+=('angular-cli')
    echo ${MISSING[@]}
fi

# Alert user to missing deps
if [ ${#MISSING[@]} -ne 0 ]; then
    warn "The following dependencies appear to be missing: ${MISSING[@]}\nPlease attempt to install using the following.\n\nyarn global add ${MISSING[@]}"
fi

# Announce success
success "\nSUCCESS"
echo -e "Your project has been unpacked into ${PWD}.\n"
echo -e "Run the project by changing into its directory and running the command 'yarn start'."
echo -e "Your server should be running on http://localhost:9000/\n"
