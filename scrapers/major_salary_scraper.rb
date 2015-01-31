require 'nokogiri'
require 'open-uri'

ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require_relative '../config/environment.rb'

major = []
urls = []
salaries = {}
data = Nokogiri::HTML(open("http://careers.utah.edu/students/research/major"))

list = data.css('table.az-table')

list.css("td").css("li").css("a").each do |n|
	major << n.text
	urls << n.attribute("href").value
end

major.shift
urls.shift

urls.each_with_index do |url, idx|
	puts url
	data2 = Nokogiri::HTML(open("http://careers.utah.edu#{url}"))

	if(data2.css("div.scroll-overflow") != nil)
		begin
			salary = data2.css("div.scroll-overflow").css("tr")[2].css("td")[1].text
			if salary == "N/A"
				salary = nil
			else
				salary.gsub! ",", ""
				salary.gsub! "$", ""
				salaries["#{major[idx]}"] = salary
			end
		rescue StandardError => e
			next
		end
	end
end

salaries.each do |n, s|
	Degree.find_or_create_by(name: n, salary: s)
end