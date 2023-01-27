# Development handbook

> TMC-Coach project team

## Git conventions

Git Flow, short version<sup>[1]</sup>

```sh
git pull origin main             # Pull fresh updates from remote
git checkout -b fix-branch-name  # Switch to new branch named “fix-branch-name”

# work work work

git add -a / -p                  # Add all changes (-a) or manually selected changes (-p) to stage

git commit -m "Commit message"   # Commit changes
git push origin fix-branch-name  # Push changes to GitHub
```

## Git Flow, longer version

Atlassian describes the process well in their tutorials, Making a Pull Request. Rather than making the fork in GitHub (or as in the tutorial BitBucket), developer can create new branch in local development environment, as described in Using branches.

### Prerequisites

Begin the development of a new feature with an up-to-date project. Useful commands listed below:

```sh
git checkout main   # Switch to main branch, if not already in there
git fetch --all     # Fetch changes of all remote branches
git status          # View changes
git pull
```

## Branching

### Naming conventions

- Start name of the branch with `bugfix-`, `feat-`, or `chore`- to indicate the reason behind new branch
- Separate words with hyphen (`-`)

#### Examples

```sh
git checkout -b feat-login-frontend   # Create branch feat-login-frontend and switch to that
git branch -a                         # View all branches
git push origin feat-login-frontend   # Push new branch and its updates to GitHub
```

## Commits

Following fixed commit regulations is not needed, as descriptive information is added to the name of the branches.

## Merge Request

When a **Pull Request** is created, another developer must approve the request and merge to the main branch. After approving the merge, **the approver must update the ticket status on Sprint Kanban**.

## Running the project locally

The application can be started locally with Docker, or without Docker. Depending on the selected method, the container might need to be rebuilt or the application relaunched to see changes.

### With Docker

Pull the latest updates of the main branch and start the application with

```sh
docker compose up --build
```

The flag `--build` rebuilds the application if needed and starts the containerized applications for frontend and backend.

#### Running only frontend or backend

Frontend and backend can be started separately by starting the application inside their own directories by

```sh
cd frontend
docker build -t coach/front .
docker run -p 3000:3000 coach/front
# Open browser with http://localhost:3000
```

```sh
cd backend
docker build -t coach/back .
docker run -p 5000:5000 coach/back
# Requests to local http://localhost:5000 are connected to container port 5000
```

### Without Docker

Running the application without the Docker can be done inside their own directories as well.

#### Frontend

```sh
cd frontend
npm install
npm start
```

#### Backend

```sh
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python wsgi.py
```

## References

[1] Initial source for the Git worklow idea borrowed from [Kisallioppimisen ohtuprojekti](https://github.com/OhtuKisalli/project-info/blob/master/workflow.md)
