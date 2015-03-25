require 'nokogiri'
require 'open-uri'
require 'json'
require 'pathname'
require 'yaml'
require 'csv'

ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require_relative '../config/environment.rb'

url = "http://www.payscale.com/index/US/Degree"

doc = Nokogiri::HTML(open(url))

majors = {}
jobs = {}

doc.css("table").css("tr").each do |p|
	node = p.css("td").css("a")
	next if p.css("th").text != ""

	m_names = node.text.split(",")

	m_names[0].gsub!(%r[ \(.*\)],"")

	d_url = "http://www.payscale.com" + node.attribute("href").value.gsub("Hourly_Rate","Salary")

	d_doc = Nokogiri::HTML(open(d_url))

	j_names = []
	j_salaries = []

	d_doc.css("table.tlf.f11.w600").css("tr").each do |t|
		begin
			j_url = t.css("a").attribute("href").value
		rescue StandardError => e
			next
		end

		next if j_url[0] == "j"

		j_names << t.css("a").text

		j_doc = Nokogiri::HTML(open("http://www.payscale.com" + j_url))

		j_salary = j_doc.css("div.you_label")[0].text
		j_salary.gsub!("\r\n","")
		j_salary.gsub!("\s","")
		j_salary.gsub!("MEDIAN:","")
		j_salary.gsub!("$","")
		j_salary.gsub!(",","")
		j_salaries << j_salary[1..-1]
	end

	j_names.each_with_index do |j,i|
		jobs[j] = [j,j_salaries[i]]
	end

	m_s_avg = j_salaries.inject{ |sum, el| sum + el }.to_f / j_salaries.size

	m_names << m_s_avg

	majors[m_names[1]] = m_names
end

puts majors
puts jobs