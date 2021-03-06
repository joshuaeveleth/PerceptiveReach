Given(/^I am on http:\/\/localhost:(\d+)\/$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  visit ('http://localhost:7003')
end

When(/^I click on edit of widget (\d+)$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  page.find(:xpath, "html/body/div[2]/div/div/div/div[2]/div[1]/div/div[1]/h3/span[4]").click
end

When(/^I change the title on pop\-up to "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  fill_in('widgetTitle',:with=>'Example')
end

When(/^I click on ok button$/) do
  #pending # express the regexp above with the code you wish you had
  page.find(:xpath,"html/body/div[4]/div/div/div[3]/button[2]").click
end

Then(/^I should see the widget (\d+) title change to "(.*?)"$/) do |arg1, arg2|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg2)
end


When(/^I click on "(.*?)"$/) do |arg1|
  page.find(:xpath,"html/body/div[2]/div/ul/li[1]/a/span[1]").click
end

Then(/^I should see the "(.*?)" on page for National view$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end


When(/^I click on individual "(.*?)"$/) do |arg1|
  page.find(:xpath,"html/body/div[2]/div/ul/li[4]/a/span[1]").click
  
  
end

Then(/^I should see the widget "(.*?)" on page for Individual view$/) do |arg1|
  expect(page).to have_content(arg1)
end


#edit widget
When(/^I click on individual view of "(.*?)"$/) do |arg1|
  page.find(:xpath,"html/body/div[2]/div/ul/li[4]/a/span[1]").click
end

When(/^I click on edit of "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  page.find(:xpath,"html/body/div[2]/div/div/div/div[2]/div[1]/div/div[1]/h3/span[4]").click
end

When(/^I click on "(.*?)" button$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  #page.find(:xpath,"html/body/div[4]/div/div/div[3]/button[2]").click
  click_button("OK")
end



When(/^I click on save button$/) do
  page.find(:xpath,"html/body/div[2]/div/div/div/div[1]/button[2]").click
end


#delete widget

When(/^I click on delete of widget (\d+)$/) do |arg1|
sleep(2)
  page.find(:xpath,"html/body/div[2]/div/div/div/div[2]/div[1]/div/div[1]/h3/span[3]").click
end

When(/^I click on save changes$/) do
  #pending # express the regexp above with the code you wish you had
  sleep(2)
  page.find(:xpath,"html/body/div[2]/div/div/div/div[1]/button[2]").click
end


Then(/^i should not see the widget "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_no_content(arg1)
end