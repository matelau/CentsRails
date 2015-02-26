class Api::V1::RecordNamesController < ApplicationController

	# Retrieves a list of all record names (city names, major names, etc.) for 
	# one or more tables. You can restrict the results using the optional where
	# parameter.
	def show
		result = Array.new
		error_list = []

		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:tables].present?
			error_list << 'No tables were in the tables array'
		end

		unless params[:operation].present?
			error_list << 'The operation field was empty'
		end

		# Also uses optional params[:state].

		unless error_list.empty?
			result[:errors] = error_list
			return render json: result, status: 400
		end

		tables = params[:tables]

		# Query the database.
		records = nil
		tables.each do |table|

			# Get the cost of living names.
			if table == 'coli' or table == 'colis' or table == 'cost of living'
				if params[:state]
					records = Coli.select('DISTINCT city, state').where(state: params[:state])
				else
					records = Coli.select('DISTINCT city, state')
				end

				# Format the location name as a single string.
				records.each do |record|
					if not record[:city]
						result << record[:state]
					else
						result << "#{record[:city]}, #{record[:state]}"
					end
				end

			# Get the degree names.
			elsif table == 'major' or table == 'majors' or table == 'degree' or 
				table == 'degrees'
				records = Degree.select('DISTINCT name')

				records.each do |record|
					result << record[:name]
				end

			# Get the university names.
			elsif table == 'university' or table == 'universities' or 
				table == 'school' or table == 'schools'
				records = University.select('DISTINCT name')

				records.each do |record|
					result << record[:name]
				end
			end
		end

		# Check if there are no records.
		if records.blank?
			return render json: 'No records found', status: 404
		end

		# Return the record names as a JSON object.
		result.sort!
		result << result.length
		return render json: result, status: 200
	end
end