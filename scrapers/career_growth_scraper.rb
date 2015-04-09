ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require_relative '../config/environment.rb'
require 'csv'

values = {}

CSV.foreach("../data/codes_employment.csv", :headers => true, :header_converters => :symbol, :converters => :all) do |row|
  values[row.fields[0]] = row.fields[1..-1] unless row.fields[0] == nil
end

File.readlines("../data/career_codes.txt").each do |l|
	l.strip!
	arr = l.split(";")

	next if arr[1] == nil

	res = values[arr[1]]

	puts "|#{arr[1]}|"

	Career.find_by(name: arr[0]).update(career_code: arr[1], employment_change_volume: (res[0]*1000), employment_change_percent: res[1], job_openings: (res[2]*1000))
end