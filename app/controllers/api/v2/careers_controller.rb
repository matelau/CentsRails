class Api::V2::CareersController < ApplicationController

	# Get career record names for autocomplete.
	def index
		result = Array.new
		records = Career.select('DISTINCT name')

		# Retrieve only the name field.
		records.each do |record|
			result << record[:name]
		end

		# Check if there are no records.
		if records.blank?
			return render json: 'No records found', status: 404
		end

		# Return the record names as a JSON object.
		result.sort!
		return render json: result, status: 200
	end

	# Rate a career.
	def rate
		unless api_key_is_valid?
			return render json: 'Invalid API key.', status: 401
		end

		career = Career.where(['name like ?', "#{params[:name]}%"]).first
		career_rating = RatesCareer.where(user_id: params[:user], career_id: career.id).first

		if career_rating.present?
			career_rating.rating = params[:rating]
			if career_rating.save
				return render json: 'Rating saved.', status: 200
			else
				return render json: career_rating.errors, status: 400
			end
		else
			career_rating = RatesCareer.new
			career_rating.rating = params[:rating]
			career_rating.user_id = params[:user]
			career_rating.career_id = career.id
			if career_rating.save
				return render json: 'Rating saved.', status: 200
			else
				return render json: career_rating.errors, status: 400
			end
		end
	end

	# Get career by name.
	def show
		record = Career.where(name: params[:name]).first

		if record.present?
			cents_rating = RatesCareer.find_by_sql [
				'SELECT avg(rating) AS average
				FROM rates_careers
				WHERE career_id = ?',
				record.id
			]
			career = record.as_json
			career[:average_rating] = cents_rating[0][:average].to_f
			return render json: career.except('id', 'created_at', 'updated_at'), status: 200
		else
			return render json: [], status: 404
		end
	end

	def show_best
		career = Career.order("salary DESC").first
		careers = [{name: career[:name]}]
		internal_show_two(careers, "get")
	end

	def show_worst
		career = Career.order(
			"CASE WHEN salary IS NULL THEN 100000 ELSE salary END, salary"
			).first
		careers = [{name: career[:name]}]
		internal_show_two(careers, "get")
	end

	def show_random
		ids = Degree.select(:id)
		degree = Degree.find( ids[Random.rand(ids.length)] )
		careers = [{name: career[:name]}]
		internal_show_two(careers, "get")
	end

	# Get two careers to compare.
	def show_two
		if params[:operation].present?
			operation = params[:operation]
		else
			operation = "undefined"
		end

		careers = params[:careers]
		internal_show_two(careers, operation)
	end

private

	def internal_show_two(c, o)
		result = Hash.new

		unless c.present?
			return render json: 'No careers were in the careers array', status: 404
		end

		# Order the careers.
		careers = Array.new
		if c[0][:order].present? and c[1][:order].present?
			c.each do |career|
				if career[:order] == 1
					careers << career
				end
			end
			c.each do |career|
				if career[:order] == 2
					careers << career
				end
			end
		else
			careers = c
		end

		# Create a string of the form 'name = n1 OR name = n2 ...' and a list of 
		# names. This string and list will be used to dynamically create the where 
		# clause for the query.
		where_string = ""
		where_params = Array.new
		careers.each do |career|
			where_string += 'name = ? OR '
			where_params << career[:name]
		end
		where_string = where_string[0..-5]	# Strip off the last ' OR '.

		# Query the database.
		records = Career.find_by_sql [
				"SELECT * FROM careers WHERE #{where_string};", *where_params
		]

		car = {}

		no_data_for = Array.new

		# Iterate over each career, keeping track of the career's index.
		# (The index is needed because that's how the view tracks careers.)
		index = 1
		careers.each do |career|
			match = false

			# Search through the retrieved records for a match.
			records.each do |record|
				if record[:name] == career[:name]
					match = true

					cents_rating = RatesCareer.find_by_sql [
						'SELECT avg(rating) AS average
						FROM rates_careers
						WHERE career_id = ?',
						record[:id]
					]
					cents_rating = cents_rating[0][:average].to_f

					car["career_#{index}"] = Hash.new
					car["career_#{index}"]["name_#{index}"] = record[:name]
					car["career_#{index}"]["career_salary_#{index}"] = [record[:sal2003], 
						record[:sal2004], record[:sal2005], record[:sal2006], record[:sal2007],
						record[:sal2008], record[:sal2009], record[:sal2010], record[:sal2011], 
						record[:sal2012], record[:sal2013]]
					car["career_#{index}"]["career_demand_#{index}"] = [record[:job_openings], 
							record[:employment_growth_percent], 
							record[:employment_change_volume]
					]
					car["career_#{index}"]["career_unemploy_#{index}"] = [record[:unemp11], record[:unemp12]]
					car["career_#{index}"]["career_rating_#{index}"] = cents_rating
					break
				end
			end

			# Keep track of which careers had neither exact nor state data.
			if not match
				no_data_for << career
			end

			# Increment for next object.
			index += 1
		end

		result["elements"] = []

		car.each do |k, v|
		  result["elements"] << v
		end

		result["career_unemploy_3"] = [8.9, 8.1] # two values national average

		if no_data_for.present?
			result[:no_data_for] = no_data_for
		end

		result[:operation] = o

		return render json: result, status: 200
	end
end
