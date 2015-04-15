class Api::V1::CareersController < ApplicationController
	
	# Get two careers to compare.
	def show
		result = Hash.new

		unless params[:careers].present?
			return render json: 'No careers were in the careers array', status: 404
		end

		# Order the careers.
		careers = Array.new
		if params[:careers][0][:order].present? and params[:careers][1][:order].present?
			params[:careers].each do |career|
				if career[:order] == 1
					careers << career
				end
			end
			params[:careers].each do |career|
				if career[:order] == 2
					careers << career
				end
			end
		else
			careers = params[:careers]
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

					result["name_#{index}"] = record[:name]
					result["career_salary_#{index}"] = [record[:sal2003], 
						record[:sal2004], record[:sal2005], record[:sal2006], record[:sal2007],
						record[:sal2008], record[:sal2009], record[:sal2010], record[:sal2011], 
						record[:sal2012], record[:sal2013]]
					result["career_demand_#{index}"] = [record[:job_openings], 
							record[:employment_growth_percent], 
							record[:employment_change_volume]
					]
					result["career_unemploy_#{index}"] = [record[:unemp11], record[:unemp12]]
					result["career_rating_#{index}"] = cents_rating
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

		result["career_unemploy_3"] = [8.9, 8.1] # two values national average

		if no_data_for.present?
			result[:no_data_for] = no_data_for
		end

		return render json: result, status: 200
	end
end
