Feature: As a Dashboard User, I want to see a widget that allows me to view a ""roster"" (or list) of Veterans that have been identified by the application as high risk. PR-876 1.1.11
@Add_Veteran_Roster_PR_876
Scenario: PR-876
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
Then I click the Add a Widget button
Then I add the "RosterTable" widget 
Then I click on "save changes" button
And I should see "Patient Roster by VAMC" widget
And I should see "Name" column
And I should see "SSN" column
And I should see "Phone" column
And I should see "Date First Identified" column
And I should see "Statistical Risk Level" column
And I should see "Outreach Status" column
And I click on "Logout" button