class Api::V1::SchoolsController < ApplicationController
	
	# Retrieve all location data by location name.
	def show
		result = Hash.new
		error_list = []

		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:schools].present?
			error_list.append 'No schools were in the schools array'
		end

		unless params[:operation].present?
			error_list.append 'The operation field was empty'
		end

		unless error_list.empty?
			result[:errors] = error_list
			return render json: result, status: 400
		end

		lookup = Hash.new
		schools = params[:schools]

		# Create a string of the form 'name = n1 OR name = n2 ...' and a list of 
		# names. This string and list will be used to dynamically create the where 
		# clause for the query.
		where_string = ""
		where_params = Array.new
		schools.each do |schools|
			where_string += 'name = ? OR '
			where_params << school[:name]
		end
		where_string = where_string[0..-5]	# Strip off the last ' OR '.

		# Query the database.
		records = University.select(:name,
								:state,
								:tuition_resident,
								:grade_rate_6_year,
								:size,
								:rank)
						.where([where_string, *where_params])
						.order('universities.id ASC')
end
