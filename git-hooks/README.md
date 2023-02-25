# Pre-push

Pre-push hook runs Cypress E2E tests before accepting the push.

## Prerequisites

Pre-push hook expects application to run on port 3000 and backend on port 5000.

`cypress.env.json` should contain environment variables for `tmcusername` and `tmcpassword`.

## Setup

Link file `pre-push` to `.git/hooks/` directory 

```sh
ln -s $(readlink -f .)/git-hooks/pre-push .git/hooks/pre-push
```

Setup is done only once. If the tests are not running after `git push` command, check the content of `.git/hooks/` directory.
