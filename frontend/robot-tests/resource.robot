*** Settings ***
Library		SeleniumLibrary

*** Variables ***
${SERVER}		http://127.0.0.1:3000
${BROWSER}		headlesschrome
${DELAY}		0.1 seconds
${HOME URL}		${SERVER}/
${ORGS URL}		${SERVER}/orgs
&{LOG CAPABILITY}	browser=ALL
&{CAPABILITIES}	browserName=chrome	version=${EMPTY}	platform=ANY	goog:loggingPrefs=${LOG CAPABILITY}

*** Keywords ***
Open And Configure Browser
	Open Browser			browser=${BROWSER}
	Maximize Browser Window
	Set Selenium Speed		${DELAY}

Open And Configure Logging Browser
	Open Browser	browser=${BROWSER}	desired_capabilities=${CAPABILITIES}
	Maximize Browser Window
	Set Selenium Speed		${DELAY}

Login Page Should Be Open
	Page Should Contain  Login
	Title Should Be      TMC-Coach

Orgs Page Should Be Open
	Page Should Contain  All organizations
	Wait Until Page Contains	Aleksanteri Kenan koulu	timeout=15s
	Page Should Contain  Aleksanteri Kenan koulu
	Title Should Be      TMC-Coach

Go To Login Page
	Go To	${HOME URL}

Go To Orgs Page
	Go To	${ORGS URL}

Get Browser Console Log Entries
	${selenium}=		Get Library Instance	SeleniumLibrary
	${webdriver}=		Set Variable	${selenium._drivers.active_drivers}[0]
	${log entries}=		Evaluate		$webdriver.get_log('browser')
	[Return]			${log entries}
