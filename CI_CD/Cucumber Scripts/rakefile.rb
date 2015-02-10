#encoding: utf-8 
require 'cucumber'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new(:features) do |t|
	t.profile = 'default'
	#t.cucumber_opts = "features -f html --out=report/report.html"
	t.cucumber_opts = "features --format json --out report.json"
end

Cucumber::Rake::Task.new(:SPC_Widgets) do |t|
	t.profile = 'Widget'
	#t.cucumber_opts = "features -f html --out=report/report.html"
	t.cucumber_opts = "features --format json --out report.json"
end

Cucumber::Rake::Task.new(:SPC_Widget_delete) do |t|
	t.profile = 'DeleteWidget'
	#t.cucumber_opts = "features -f html --out=report/report.html"
	t.cucumber_opts = "--tags @DeleteWidgetPR-1165 features --format json --out report.json"
end


task :Facility=> :Facility_view_ohio
task :Widget=> :SPC_Widgets
task :DeleteWidget=> :SPC_Widget_delete
task :Login=> :SPC_Login
task :default => :features
