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

	# Get career by name.
	def show
		career = Career.where(career: params[:career])
		if career.present?
			return render json: career, status: 200
		else
			return render json: [], status: 404
		end
	end

	# Get two careers to compare.
	def show_two
		result = Hash.new

		unless params[:careers].present?
			return render json: 'No careers were in the careers array', status: 404
		end

		# Order the careers.
		careers = Array.new
		if params[:careers][0][:order] and params[:careers][1][:order]
			params[:careers].each do |career|
				if career[:order] == 1
					careers << career[:name]
				end
			end
			params[:careers].each do |career|
				if career[:order] == 2
					careers << career[:name]
				end
			end
		else
			careers << params[:careers][0][:name]
			careers << params[:careers][1][:name]
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
		records = Career.select(:name, :salary).where([where_string, *where_params])

		#@averages = Career.find_by_sql "SELECT AVG(unemp_rate) AS avg_unemp_rate, 
		#										FROM colis"

		# Iterate over each career, keeping track of the career's index.
		# (The index is needed because that's how the view tracks careers.)
		index = 1
		careers.each do |career|
			result["jobs_#{index}"] = Array.new
			match = false

			# Search through the retrieved records for a match.
			records.each do |record|
				if record[:name] == career[:name]
					match = true

					result["career_salary_#{index}"] = [career[:salary], 0, 0, 0] # year 1, year 2, year 3, year 4
					result["career_satisfaction_#{index}"] = 0.0
					result["career_demand_#{index}"] = [0, 0, 0] # three values
					break
				end
			end

			#mystery
			result["career_unemploy_1"] = [0, 0] # two values
			result["career_unemploy_2"] = [0, 0] # two values
			result["career_unemploy_3"] = [0, 0] # two values national average

			# Keep track of which careers had neither exact nor state data.
			if not match
				no_data_for << career
			end

			# Increment for next object.
			index += 1
		end
	end
end
