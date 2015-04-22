require 'net/http'
require 'uri'
require 'json'

ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require_relative '../../config/environment.rb'

class String
  # colorization
  def colorize(color_code)
    "\e[#{color_code}m#{self}\e[0m"
  end

  def red
    colorize(31)
  end

  def green
    colorize(32)
  end
end

=begin
for x in 0..50
	ids = Coli.select(:id)
	rand = Random.rand(ids.length)

	coli = Coli.find(ids[rand])

	cname = "#{coli.city}, #{coli.state}"
	qs = URI.escape(cname)

	uri = URI.parse("https://trycents.com:6001/query/#{qs}")

	http = Net::HTTP.new(uri.host, uri.port)
	http.use_ssl = true if uri.scheme == 'https'
	response = http.request(Net::HTTP::Get.new(uri.request_uri))

	rbody = JSON.parse(response.body)

	passed = false
	rbody["elements"].each do |e|
		if e["name"] == cname
			passed = true
		end
	end

	if(passed)
		puts passed
	else
		puts "failed - #{cname}"
	end 
end
=end

for x in 0..50
	ids = University.select(:id)
	rand = Random.rand(ids.length)

	school = University.find(ids[rand])

	qs = URI.escape(school.name)

	uri = URI.parse("https://trycents.com:6001/query/#{qs}")

	http = Net::HTTP.new(uri.host, uri.port)
	http.use_ssl = true if uri.scheme == 'https'
	response = http.request(Net::HTTP::Get.new(uri.request_uri))

	rbody = JSON.parse(response.body)

	passed = ""
	if rbody["elements"] != nil
		rbody["elements"].each do |e|
			if e["name"] == school.name
				passed = "passed".green
			end
		end
		passed = "failed on results - #{school.name}".red if passed == ""
	else
		passed = "failed no results - #{school.name}".red
	end

	puts passed
end