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

		# Also uses optional params[:select] and params[:where].

		unless error_list.empty?
			result[:errors] = error_list
			return render json: result, status: 400
		end

		tables = params[:tables]

		# Query the database.
		records = nil
		tables.each do |table|

			# Get the cost of living names.
			if table == 'coli' or table == 'colis' or table == 'cost of living' or
				 table == 'city' or table == 'cities'

				if params[:where] and not params[:select]
					records = Coli.select('DISTINCT city').where(['state = ? and city IS NOT NULL', params[:where]])

					# Format the location name as a single string.
					records.each do |record|
						result << record[:city]
					end

				elsif params[:select] and not params[:where]
					records = Coli.select('DISTINCT state')
					records.each do |record|
						result << record[:state]
					end

				elsif (not params[:select]) and (not params[:where])
					records = Coli.select('DISTINCT city, state')
					
					# Format the location name as a single string.
					records.each do |record|
						if not record[:city]
							result << record[:state]
						else
							result << "#{record[:city]}, #{record[:state]}"
						end
					end

				else
					records = Coli.select('DISTINCT state').where(state: params[:where])
					records.each do |record|
						result << record[:state]
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
				# records = University.select('DISTINCT name')

				# records.each do |record|
				# 	result << record[:name]
				# end

				if params[:where] and not params[:select]
					records = University.select('DISTINCT name').where(['state LIKE ?', "%#{params[:where]}"])

					# Format the location name as a single string.
					records.each do |record|
						result << record[:name]
					end

				elsif params[:select] and not params[:where]
					records = University.select('DISTINCT state')
					records.each do |record|
						result << record[:state]
					end

				elsif (not params[:select]) and (not params[:where])
					records = University.select('DISTINCT name, state')
					
					# Format the location name as a single string.
					records.each do |record|
						result << "#{record[:name]}, #{record[:state]}"
					end

				else
					records = University.select('DISTINCT state').where(['state LIKE ?', "%#{params[:where]}"])
					records.each do |record|
						result << record[:state]
					end
				end
			end
		end

		# Check if there are no records.
		if records.blank?
			return render json: 'No records found', status: 404
		end

		# Return the record names as a JSON object.
		result.sort!
		return render json: result, status: 200
	end
end