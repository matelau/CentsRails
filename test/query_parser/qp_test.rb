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

puts "CITIES TEST"
used_ids = []
for x in 0..100
	ids = Coli.select(:id)
	rand = Random.rand(ids.length)

	while used_ids.include? rand
		rand = Random.rand(ids.length)
	end

	coli = Coli.find(ids[rand])

	if coli.city == nil
		next
	end

	split = Random.rand(2);

	if(split == 1)
		cname = "#{coli.city}, #{coli.state}"
		rname = cname
	else
		cname = "#{coli.city}"
		rname = "#{coli.city}, #{coli.state}"
	end
	qs = URI.escape(cname)

	uri = URI.parse("https://trycents.com:6001/query/#{qs}")

	http = Net::HTTP.new(uri.host, uri.port)
	http.use_ssl = true if uri.scheme == 'https'
	response = http.request(Net::HTTP::Get.new(uri.request_uri))

	rbody = JSON.parse(response.body)

	passed = ""
	if rbody["elements"] != nil
		rbody["elements"].each do |e|
			if e["name"] == rname
				passed = "passed".green
				break
			end
		end
		passed = "failed on results - #{cname}".red if passed == ""
	else
		passed = "failed no results - #{cname}".red
	end

	puts passed
end

puts "SCHOOLS TEST"
used_ids = []
for x in 0..100
	ids = University.select(:id)
	rand = Random.rand(ids.length)

	while used_ids.include? rand
		rand = Random.rand(ids.length)
	end

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
				break
			end
		end
		passed = "failed on results - #{school.name}".red if passed == ""
	else
		passed = "failed no results - #{school.name}".red
	end

	puts passed
end

puts "MAJORS TEST"
used_ids = []
for x in 0..100
	ids = Degree.select(:id)
	rand = Random.rand(ids.length)

	while used_ids.include? rand
		rand = Random.rand(ids.length)
	end

	degree = Degree.find(ids[rand])

	qs = URI.escape(degree.name)

	uri = URI.parse("https://trycents.com:6001/query/#{qs}")

	http = Net::HTTP.new(uri.host, uri.port)
	http.use_ssl = true if uri.scheme == 'https'
	response = http.request(Net::HTTP::Get.new(uri.request_uri))

	rbody = JSON.parse(response.body)

	passed = ""
	if rbody["elements"] != nil
		rbody["elements"].each do |e|
			if e["name"].include? degree.name
				passed = "passed".green
				break
			end
		end
		passed = "failed on results - #{degree.name}".red if passed == ""
	else
		passed = "failed no results - #{degree.name}".red
	end

	puts passed
end

puts "CAREERS TEST"
used_ids = []
for x in 0..100
	ids = Career.select(:id)
	rand = Random.rand(ids.length)

	while used_ids.include? rand
		rand = Random.rand(ids.length)
	end

	career = Career.find(ids[rand])

	qs = URI.escape(career.name)

	qs.gsub!("/","")

	uri = URI.parse("https://trycents.com:6001/query/#{qs}")

	http = Net::HTTP.new(uri.host, uri.port)
	http.use_ssl = true if uri.scheme == 'https'
	response = http.request(Net::HTTP::Get.new(uri.request_uri))

	rbody = JSON.parse(response.body)

	passed = ""
	if rbody["elements"] != nil
		rbody["elements"].each do |e|
			if e["name"] == career.name
				passed = "passed".green
				break
			end
		end
		passed = "failed on results - #{career.name}".red if passed == ""
	else
		passed = "failed no results - #{career.name}".red
	end

	puts passed
end