Feature: As a Administrator/Supervisor, I want to access CDS Questionnairein the Individual View PR-3438

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view Consolidated Individual View widgets
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER260"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
And I click on "Add a Widget" button
And I click on "CDSQuestionnaire" button in the menu
Then I should see "CDS Questionnaire" widget
And I should see "Clinical Decision Support"
And I should see "Suicide Attempt(s)"
And I should see "3 or more Medications"
And I should see "Alcohol Use Disorder"
And I should see "Antidepressants"
And I click on "Logout" button




