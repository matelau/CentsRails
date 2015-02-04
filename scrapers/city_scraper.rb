require 'nokogiri'
require 'open-uri'
require 'json'
require 'pathname'
require 'yaml'
require 'csv'

ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require_relative '../config/environment.rb'

states = {}

arr = CSV::parse(File.open("../query_service/states.csv", 'r') {|f| f.read})
arr.shift
arr.each {|k,v| states[k.downcase] = v.downcase}

states.each do |abbr, st|
	url = "http://www.areavibes.com/" + abbr
	puts url

	data = Nokogiri::HTML(open(url))

	data.css("div.tabbed").css("div.panel#sized").css("li").css("a").each do |p|
		city = p.attribute("href").value.gsub("/livability/", "")
		city = city.gsub!("/","")
		File.open("../data/scraped/city_urls.txt", 'a') {|f| f.puts city + "\n" }
	end
end
