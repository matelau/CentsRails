require 'nokogiri'
require 'open-uri'
require 'json'
require 'pathname'
require 'yaml'
require 'csv'
require 'set'

ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require_relative '../config/environment.rb'

if(false)
	url = "http://www.wsj.com/public/resources/documents/st_UNEMPLOYRATES20130107.html"

	doc = Nokogiri::HTML(open(url))

	names = {}

	File.open("../data/scraped/unemp.txt", 'a') {|f| f.puts "job name;industry;unemp 2011;unemp 2012" }

	doc.css("table#mySortableTable").css("tr").each do |p|
		row = p.css("td")
		j_name = row[0].text.strip
		j_ind = row[1].text.strip
		unemp11 = row[2].text.strip
		unemp12 = row[3].text.strip

		File.open("../data/scraped/unemp.txt", 'a') {|f| f.puts j_name + ";" + j_ind + ";" + unemp11 + ";" + unemp12 }
	end
end

File.readlines("../data/careers.txt").each do |l|
	arr = l.split(";")

	Career.find_by(name: arr[0]).update(unemp11: arr[1], unemp12: arr[2])
end

#cars = Career.all

#cars.each do |c|
#	File.open("../data/scraped/careers.txt", 'a') {|f| f.puts c.name}
#end