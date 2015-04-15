class Api::V1::MajorsController < ApplicationController

	def show
		result = Hash.new

		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:majors].present?
			return render json: 'No objects were in the majors array.', status: 400
		end

		# Order the majors.
		majors = Array.new
		if params[:majors][0][:order] and params[:majors][1][:order]
			params[:majors].each do |major|
				if major[:order] == 1
					majors << major
				end
			end
			params[:majors].each do |major|
				if major[:order] == 2
					majors << major
				end
			end
		else
			params[:majors].each do |major|
				majors << major
			end
		end

		# Create a string of the form 'd.name = ? OR ... ' and a list of major names.
		# This string and list will be used to dynamically create the where clause
		# for the query.
		where_string = ""
		where_params = Array.new
		majors.each do |major|
			where_string += 'name = ? OR '
			where_params << major[:name].strip
		end
		where_string = where_string[0..-5]	# Strip off the last ' OR '.

		records = Degree.find_by_sql [
			"SELECT id AS id_from_degree,
							name AS degree_name,
							level,
							salary AS degree_salary,
							recommend,
							meaningful
			FROM degrees
			WHERE #{where_string}",
			*where_params
		]

		no_data_for = Array.new

		# Iterate over each major, keeping track of the majors's index.
		# (The index is needed because that's how the view tracks majors.)
		index = 1
		majors.each do |major|
			match = false

			# Search through the retrieved records for an exact match.
			records.each do |record|
				if record[:degree_name] == major[:name].strip and record[:level] == major[:level]
					match = true
					salary = record[:degree_salary] ? record[:degree_salary].to_f : nil
					recommended = record[:recommend] ? record[:recommend].to_f : nil
					meaningful = record[:meaningful] ? record[:meaningful].to_f : nil
					
					top_jobs = TopJob.find_by_sql [
						"SELECT name, salary
						FROM top_jobs
						WHERE degree_id = ?
						ORDER BY salary DESC
						LIMIT 3",
						record[:id_from_degree]
					]
					cents_rating = RatesMajor.find_by_sql [
						'SELECT avg(rating) AS average
						FROM rates_majors
						WHERE degree_id = ?',
						record[:id_from_degree]
					]
					cents_rating = cents_rating[0][:average].to_f

					result["name_#{index}"] = "#{record[:degree_name]} (#{record[:level]})"
					result["major_#{index}"] = [salary, recommended, meaningful, cents_rating]
					result["jobs_#{index}"] = Array.new
					
					top_jobs.each do |job|
						result["jobs_#{index}"].concat [job[:name], job[:salary]]
					end
					break
				end
			end

			# Keep track of which majors had neither exact nor state data.
			if not match
				no_data_for << "#{major[:name]} (#{major[:level]})"
			end

			# Increment for next object.
			index += 1
		end

		# If there is no data for a major, send an error message.
		unless no_data_for.empty?
			result[:error] = 'No data on some majors'
			result[:no_data_for] = no_data_for
			result[:operation] = 'undefined' # Needed for the query parser.
			return render json: result, status: 404
		end

		result[:operation] = params[:operation]

		# Return the result, formatted as JSON, and with a 200 OK HTTP code.
		render json: result, status: 200
	end
end
