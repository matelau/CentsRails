require 'nokogiri'
require 'open-uri'
require 'json'
require 'pathname'
require 'yaml'
require 'csv'
require 'set'

ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require_relative '../config/environment.rb'

url = "http://www.wsj.com/public/resources/documents/st_UNEMPLOYRATES20130107.html"

doc = Nokogiri::HTML(open(url))

names = {}

doc.css("table#mySortableTable").css("tr").each do |p|
	row = p.css("td")
	j_name = row[0].text
	j_ind = row[1].text
	unemp11 = row[2].text
	unemp12 = row[3].text

	names[j_name] = [unemp11,unemp12]
	names[j_ind] = [unemp11,unemp12]
end

cars = Career.all

count = 0

cars.each do |c|
	next if c.name == nil
	names.each do |k,v|
		if k.downcase.include? c.name.downcase
		#if cname.to_set.subset? k.downcase.split(" ").to_set
			count += 1
			break
		end
	end
end

puts count
puts names.size
puts cars.size