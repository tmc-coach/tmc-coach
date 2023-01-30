# TMC-Coach Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### Robot Framework tests

Robot Framework tests uses TMC Credentials stored in `/robot-tests/login_resource.robot`. Use the file `/robot-tests/login_resource.example.robot` as a template for credential variables.

Run Robot Framework tests by starting the frontend and backend application, and running following commands

```sh
cd robot-tests
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
robot --version   # to verify robot framework installation
robot .
```
