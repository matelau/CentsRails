require 'nokogiri'
require 'open-uri'
require 'json'
require 'pathname'
require 'yaml'
require 'csv'

ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require_relative '../config/environment.rb'

url = "http://www.wsj.com/public/resources/documents/st_UNEMPLOYRATES20130107.html"

docs = Nokogiri::HTML(open(url))

careers = {}

docs.css("table").css("tr").each do |t| 
	cname = t.css("td")[0].text.strip
	urate11 = t.css("td")[2].text.strip
	urate12 = t.css("td")[3].text.strip

	careers[cname] = [urate11,urate12]
end

arr = CSV::parse(File.open("../data/nat_careers.csv", 'r') {|f| f.read})

arr.each do |name,group,num,salary1,salary2|
	careers.each do |k,v|
		next if v.count > 2

		if k =~ /.*#{name}.*/
			careers[k] << num
			careers[k] << salary2
		end
	end
end

count = 0

careers.each do |c,j|
	if j.count > 2
		count += 1;
		puts "#{c} : #{j}"
	end
end

puts count
puts careers.count