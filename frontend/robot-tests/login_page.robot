*** Settings ***
Resource		resource.robot
Variables		login_resource.py
Suite Setup		Open And Configure Logging Browser
Suite Teardown	Close Browser
Test Setup		Go To Login Page


*** Test Cases ***
User Can Open Login Page
	Log		${TMCUSERNAME}
	Login Page Should Be Open

User Can Login With Valid Credentials
	Set Username
	Set Password
	Click Button	Login
	Wait Until Page Contains	Your courses	timeout=5s

*** Keywords ***
Set Username
	Input Text	username	${TMCUSERNAME}

Set Password
	Input Text	password	${TMCPASSWORD} 
