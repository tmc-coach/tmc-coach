*** Settings ***
Resource		resource.robot
Suite Setup		Open And Configure Browser
Suite Teardown	Close Browser
Test Setup		Go To Orgs Page


*** Test Cases ***
User Can Open Orgs Page
	Orgs Page Should Be Open
