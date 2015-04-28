Feature: As a Dashboard User, I want to pick and choose which screen elements I see on the Dashboard, so I can first see only the data that is important to me. PR-356 1.1.7
@PR-356
Scenario: PR-356
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach Login"
Then I put in "Username" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on "Login" button
When I click on "Individual View"
Then I click the Add a Widget button
And I add the "time" widget
And I click on "save changes" button
Then I should see "time" widget
And I click on "Logout" button