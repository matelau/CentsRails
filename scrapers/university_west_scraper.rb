require 'nokogiri'
require 'open-uri'

ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require_relative '../config/environment.rb'
count = 0
for i in 1..8
	url = "http://colleges.usnews.rankingsandreviews.com/best-colleges/rankings/regional-universities-west/data/"
	if i > 1
		url += "page+#{i}"
	end

	data = Nokogiri::HTML(open(url))

	list = data.css('div.article')

	table = list.xpath("table")
	body = table.xpath("tbody")
	body.xpath("tr").each do |row|
		count += 1
		rank = row.xpath("td")[0].xpath("div").xpath("span").text.strip
		rank.gsub! "Tie", ""
		rank.gsub! "#", ""
		if(rank == "Unranked")
			rank = nil
		end

		school = row.xpath("td")[1].css("a.school-name").text.strip

		location = row.xpath("td")[1].css("p.location").text.strip

		tuition = row.xpath("td")[2].text.gsub("\n", "").strip

		instate = ""
		outofstate = ""
		if(tuition[0] != "$")
			instate = tuition.gsub("in-state: ", "")
			instate.gsub!(/, out-of-state: .*/, "")
			instate.gsub! "$", ""
			instate.gsub! ",", ""

			outofstate = tuition.gsub(/in-state: .*, out-of-state: /, "")
			outofstate.gsub! "$", ""
			outofstate.gsub! ",", ""
		else
			tuition.gsub! "$", ""
			tuition.gsub! ",", ""

			instate = tuition
			outofstate = tuition
		end

		if(instate == "N/A")
			instate = nil
		end
		if(outofstate == "N/A")
			outofstate = nil
		end

		pop = row.xpath("td")[3].text.strip
		pop.gsub! ",", ""
		if(pop == "N/A")
			pop = nil
		end

		grad = row.xpath("td")[6].text.strip
		grad.gsub! "\n", ""
		grad.gsub! /%.*/, ""	
		if(grad == "N/A")
			grad = nil
		end

		puts school

		University.find_or_create_by(name: school, state: location, size: pop, tuition_resident: instate, tuition_nonresident: outofstate, grad_rate_6_year: grad)
	end
end
puts count