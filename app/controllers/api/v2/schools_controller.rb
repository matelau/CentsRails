class Api::V2::SchoolsController < ApplicationController
	# Get school record names for autocomplete.
	def index
		result = Array.new

		if params[:location] and not (params[:only_location_names] == 'true')
			records = University.select('DISTINCT name').where(['state LIKE ?', "%#{params[:location]}%"])
			records.each do |record|
				result << record[:name]
			end

		elsif params[:only_location_names] == 'true' and not params[:location]
			records = University.select('DISTINCT state')
			records.each do |record|
				result << record[:state]
			end

		elsif (not (params[:only_location_names] == 'true')) and (not params[:location])
			records = University.select('DISTINCT name, state')
			records.each do |record|
				result << record[:name]
			end

		else
			records = University.select('DISTINCT state').where(['state LIKE ?', "%#{params[:location]}%"])
			records.each do |record|
				result << record[:state]
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

	# Get school by name.
	def show
		school = University.where(['name LIKE ?', "#{params[:name]}%"])
		if school.present?
			return render json: school, status: 200
		else
			return render json: [], status: 404
		end
	end

	# Get school by location.
	def show_location
		school = University.where(['state LIKE ?', "%#{params[:location]}%"])
		if school.present?
			return render json: school, status: 200
		else
			return render json: [], status: 404
		end
	end

	# Get school data for two schools.
	def show_two
		result = Hash.new

		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:schools].present?
			return render json: 'No schools were in the schools array', status: 400
		end

		# Order the schools.
		schools = Array.new
		if params[:schools][0][:order] and params[:schools][1][:order]
			params[:schools].each do |school|
				if school[:order] == 1
					schools << school
				end
			end
			params[:schools].each do |school|
				if school[:order] == 2
					schools << school
				end
			end
		else
			schools = params[:schools]
		end

		# Create a string of the form 'name = n1 OR name = n2 ...' and a list of 
		# names. This string and list will be used to dynamically create the where 
		# clause for the query.
		where_string = ""
		where_params = Array.new
		schools.each do |school|
			where_string += 'name = ? OR '
			where_params << school[:name]
		end
		where_string = where_string[0..-5]	# Strip off the last ' OR '.

		# Query the database.
		records = University.select(:name,
								:state,
								:tuition_resident,
								:tuition_nonresident,
								:grad_rate_6_year,
								:size,
								:rank,
								:image)
						.where([where_string, *where_params])
						.order('universities.id ASC')

		no_data_for = Array.new

		# Iterate over each location, keeping track of the location's index.
		# (The index is needed because that's how the view tracks locations.)
		index = 1
		schools.each do |school|
			match = false

			# Search through the retrieved records for an exact match.
			records.each do |record|
				if record[:name]  == school[:name] 
					match = true

					# Convert each record to a float, or nil iff null.
					tuition_resident = record[:tuition_resident]
					tuition_resident = tuition_resident ? tuition_resident.to_f : nil
					tuition_nonresident = record[:tuition_nonresident]
					tuition_nonresident = tuition_nonresident ? tuition_nonresident.to_f : nil
					grad_rate = record[:grad_rate_6_year]
					grad_rate = grad_rate ? grad_rate.to_f : nil
					size = record[:size]
					size = size ? size.to_f : nil
					rank = record[:rank]
					rank = rank ? rank.to_f : nil
					
					# Put the stats in result.
					result["school_#{index}"] = [tuition_resident, tuition_nonresident, 
						grad_rate, size, rank, 0]
					result["school_#{index}_image"] = record[:image]
					break
				end
			end

			# Keep track of which schools had no data
			if not match
				no_data_for << school
			end

			# Increment for next object.
			index += 1
		end

		# If there is no data for a school, send an error message.
		unless no_data_for.empty?
			result[:error] = 'No data on some schools'
			result[:no_data_for] = no_data_for
			result[:operation] = 'undefined' # Needed for the query parser.
			return render json: result, status: 404
		end

		# Add the operation parameter for the query parser.
		result[:operation] = params[:operation]

		return render json: result, status: 200
	end
end
