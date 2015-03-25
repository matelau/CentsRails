class Api::V1::CareerController < ApplicationController

	# Retrieve all careers by career name.
	def show
		result = Hash.new
		error_list = []

		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:careers].present?
			error_list << 'No careers were in the schools array'
		end

		unless params[:operation].present?
			error_list << 'The operation field was empty'
		end

		unless error_list.empty?
			result[:errors] = error_list
			return render json: result, status: 400
		end

		careers = params[:careers]

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
		records = Career.select(:name)
						.where([where_string, *where_params])
						.order('careers.id ASC')

		# Iterate over each career, keeping track of the career's index.
		# (The index is needed because that's how the view tracks careers.)
		index = 1
		careers.each do |career|
			result["jobs_#{index}"] = Array.new
			match = false

			# Search through the retrieved records for an exact match.
			records.each do |record|
				if record[:name] == career
					match = true

					#salary = record[:degree_salary] ? record[:degree_salary].to_f : nil
					#recommended = record[:recommend] ? record[:recommend].to_f : nil
					#meaningful = record[:meaningful] ? record[:meaningful].to_f : nil
					#job_name = record[:job_name] ? record[:job_name] : nil
					#job_salary = record[:job_salary] ? record[:job_salary].to_f : nil
					# Cents rating goes here
					#cents_rating = 0

					result["career_salary_#{index}"] = [] # year 1, year 2, year 3, year 4
					result["career_satisfaction_#{index}"] = 0.0
					result["career_demand_#{index}"] = [] # three values
					
					#mystery
					result["career_unemploy_1"] = [] # two values
					result["career_unemploy_2"] = [] # two values
					result["career_unemploy_3"] = [] # two values
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
end
