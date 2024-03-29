class Api::V2::SchoolsController < ApplicationController

	# Get school record names for autocomplete.
	def index
		result = Array.new

		if params[:location] and not (params[:only_location_names] == 'true')
			if params[:location].length == 2
				records = University.select('DISTINCT name').where(['state LIKE ?', "%#{params[:location]}"])
			else
				records = University.select('DISTINCT name').where(['state LIKE ?', "%#{params[:location]}%"])
			end
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

	# Rate a school.
	def rate
		unless api_key_is_valid?
			return render json: 'Invalid API key.', status: 401
		end

		school = University.where(['name like ?', "#{params[:name]}%"]).first
		school_rating = RatesSchool.where(user_id: params[:user], university_id: school.id).first

		if school_rating.present?
			school_rating.rating = params[:rating]
			if school_rating.save
				return render json: 'Rating saved.', status: 200
			else
				return render json: school_rating.errors, status: 400
			end
		else
			school_rating = RatesSchool.new
			school_rating.rating = params[:rating]
			school_rating.user_id = params[:user]
			school_rating.university_id = school.id
			if school_rating.save
				return render json: 'Rating saved.', status: 200
			else
				return render json: school_rating.errors, status: 400
			end
		end
	end

	# Get school by name.
	def show
		records = University.where(['name LIKE ?', "#{params[:name]}%"])
		schools = Array.new

		records.each do |record|
			cents_rating = RatesSchool.find_by_sql [
				'SELECT avg(rating) AS average
				FROM rates_schools
				WHERE university_id = ?',
				record.id
			]
			record = record.as_json
			record[:average_rating] = cents_rating[0][:average].to_f
			schools << record.except('id', 'created_at', 'updated_at')
		end

		if schools.present?
			return render json: schools, status: 200
		else
			return render json: [], status: 404
		end
	end

	def show_best
		school = University.order(
			"CASE WHEN rank IS NULL THEN 250 ELSE rank END, rank"
			).first
		schools = [{name: school[:name]}]
		internal_show_two(schools, "get")
	end

	def show_worst
		school = University.order(
			"CASE WHEN grad_rate_6_year IS NULL THEN 101 ELSE grad_rate_6_year END, grad_rate_6_year"
			).first
		schools = [{name: school[:name]}]
		internal_show_two(schools, "get")
	end

	def show_cheapest
		school = University.order(
			"CASE WHEN tuition_nonresident IS NULL THEN 100000 ELSE tuition_nonresident END, tuition_nonresident"
			).first
		schools = [{name: school[:name]}]
		internal_show_two(schools, "get")
	end

	def show_priciest
		school = University.order("tuition_nonresident DESC").first
		schools = [{name: school[:name]}]
		internal_show_two(schools, "get")
	end

	def show_random
		ids = University.select(:id)
		school1 = University.find( ids[Random.rand(ids.length)] )
		school2 = University.find( ids[Random.rand(ids.length)] )
		schools = [{name: school1[:name]},{name: school2[:name]}]
		internal_show_two(schools, "compare")
	end

	# Get school by location.
	def show_location
		records = University.where(['state LIKE ?', "%#{params[:location]}%"])
		schools = Array.new

		records.each do |record|
			cents_rating = RatesSchool.find_by_sql [
				'SELECT avg(rating) AS average
				FROM rates_schools
				WHERE university_id = ?',
				record.id
			]
			record = record.as_json
			record[:average_rating] = cents_rating[0][:average].to_f
			schools << record.except('id', 'created_at', 'updated_at')
		end

		if schools.present?
			return render json: schools, status: 200
		else
			return render json: [], status: 404
		end
	end

	# Get school data for two schools.
	def show_two
		if params[:operation].present?
			operation = params[:operation]
		else
			operation = "undefined"
		end

		schools = params[:schools]
		internal_show_two(schools, operation)
	end

private

	def internal_show_two(s, o)
		result = Hash.new

		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless s.present?
			return render json: 'No schools were in the schools array', status: 400
		end

		# Order the schools.
		schools = Array.new
		if s[0][:order] and s[1][:order]
			s.each do |school|
				if school[:order] == 1
					schools << school
				end
			end
			s.each do |school|
				if school[:order] == 2
					schools << school
				end
			end
		else
			schools = s
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
		records = University.select(:id,
								:name,
								:state,
								:tuition_resident,
								:tuition_nonresident,
								:grad_rate_6_year,
								:size,
								:rank,
								:image)
						.where([where_string, *where_params])
						.order('universities.id ASC')

		sch = {}

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
					cents_rating = RatesSchool.find_by_sql [
						'SELECT avg(rating) AS average
						FROM rates_schools
						WHERE university_id = ?',
						record[:id]
					]
					cents_rating = cents_rating[0][:average].to_f
					
					# Put the stats in result.
					sch["school_#{index}"] = Hash.new
					sch["school_#{index}"]["name"] = record[:name]
					sch["school_#{index}"]["school"] = [tuition_resident, tuition_nonresident, 
						grad_rate, size, rank, cents_rating]
					sch["school_#{index}"]["school_image"] = record[:image]
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

		result["elements"] = []

		sch.each do |k, v|
		  result["elements"] << v
		end

		# If there is no data for a school, send an error message.
		unless no_data_for.empty?
			result[:error] = 'No data on some schools'
			result[:no_data_for] = no_data_for
			result[:operation] = 'undefined' # Needed for the query parser.
			return render json: result, status: 404
		end

		# Add the operation parameter for the query parser.
		result[:operation] = o

		return render json: result, status: 200
	end
end
