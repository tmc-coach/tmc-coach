*** Settings ***
Resource		resource.robot
Resource		login_resource.robot
Suite Setup		Open And Configure Logging Browser
Suite Teardown	Close Browser
Test Setup		Go To Login Page

*** Test Cases ***
User Can Open Login Page
	Login Page Should Be Open

User Can Login With Valid Credentials
	Set Username
	Set Password
	Click Button	Login
	${LOGS}=		Get Browser Console Log Entries    
	Should Be True	"""${USERNAME}""" in """${LOGS}"""

*** Keywords ***
Set Username
	Input Text	username	${USERNAME}

Set Password
	Input Text	password	${PASSWORD} 
