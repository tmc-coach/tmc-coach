# Pre-commit

Pre-commit hook runs Cypress E2E tests before accepting the commit.

Pre-commit hook expects application to run on port 3000 and backend on port 5000.

## Setup

Link file `pre-commit` to `.git/hooks/` directory with

```sh
ln -s $(readlink -f .)/git-hooks/pre-commit .git/hooks/pre-commit
```
