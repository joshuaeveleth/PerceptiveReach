require 'capybara/cucumber'

Capybara.default_wait_time = 8
Capybara.default_driver = :selenium_chrome


 Capybara.register_driver :selenium_chrome do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Before do |scenario|
page.driver.browser.manage.delete_all_cookies
page.driver.browser.manage.window.maximize
end
Capybara.javascript_driver = :chrome