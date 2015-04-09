ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require_relative '../../config/environment.rb'
require 'csv'

files = Dir["*.csv"]

salaries = {}

CSV.foreach("sal2013.csv", :headers => true, :header_converters => :symbol, :converters => :all) do |row|
  salaries[row.fields[0]] = {"sal2013" => row.fields[1]} unless row.fields[0] == nil
end

files.delete("sal2013.csv")

files.each do |f|
	CSV.foreach(f, :headers => true, :header_converters => :symbol, :converters => :all) do |row|
		salaries[row.fields[0]] = {File.basename(f,".*") => row.fields[1]} if salaries[row.fields[0]] == nil
	  	salaries[row.fields[0]][File.basename(f,".*")] = row.fields[1] unless row.fields[0] == nil
	end
end

cars = Career.all

cars.each do |c|
	next if salaries[c.career_code] == nil

	vals = salaries[c.career_code]

	next if vals == nil

	vals.each do |n,v|
		c.update("#{n}" => v)
	end
end