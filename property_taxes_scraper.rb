require 'nokogiri'
require 'open-uri'
require 'json'
require 'pathname'
require 'yaml'
require 'csv'

ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require '~/Documents/dev/CentsRails/config/environment.rb'

for i in 1..51
	url = "http://interactive.taxfoundation.org/propertytax/datastate.php?stateID=" + i.to_s + "&timeframe=10"
	puts "pulling data for: "+ url + "\n"
	data = nil
	begin
		data = Nokogiri::XML.parse(open(url))
	rescue OpenURI::HTTPError => e
		log_file = Pathname.pwd.to_s + "/data/error_logs"
		error_message = DateTime.now.to_s + " Cost_of_living_scraper.rb area: "+ area + " error: "+ e.message.to_s
		File.write(log_file, error_message)
		# continue
		next
	end
	
	Coli.where(state: data.xpath("//a").text).find_each do |row|
		row.update(property_tax: data.xpath("//b").text)
	end
end

