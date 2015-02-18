class Api::V1::MajorsController < ApplicationController

	def show
		result = Hash.new
		error_list = []

		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:majors].present?
			error_list << 'No objects were in the majors array.'
		end

		unless params[:operation].present?
			error_list << 'The operation field was empty.'
		end

		unless error_list.empty?
			result[:errors] = error_list
			return render json: result, status: 400
		end

		majors = params[:majors]

		# Create a string of the form 'd.name = ? OR ... ' and a list of major names.
		# This string and list will be used to dynamically create the where clause
		# for the query.
		where_string = ""
		where_params = Array.new
		majors.each do |major|
			where_string += 'd.name = ? OR '
			where_params << major[:name]
		end
		where_string = where_string[0..-5]	# Strip off the last ' OR '.

		records = Degree.find_by_sql [
			"SELECT d.name AS degree_name,
							d.salary AS degree_salary,
							d.recommend,
							d.satisfaction,
							j.name AS job_name,
							j.salary AS job_salary
			FROM degrees AS d
			LEFT OUTER JOIN top_jobs AS j
			ON d.id = j.degree_id
			WHERE #{where_string}",
			*where_params
		]

		no_data_for = Array.new

		# Iterate over each major, keeping track of the majors's index.
		# (The index is needed because that's how the view tracks majors.)
		index = 1
		majors.each do |major|
			result["jobs_#{index}"] = Array.new
			match = false

			# Search through the retrieved records for an exact match.
			records.each do |record|
				if record[:degree_name]  == major[:name]
					match = true

					salary = record[:degree_salary] ? record[:degree_salary].to_f : nil
					recommended = record[:recommend] ? record[:recommend].to_f : nil
					satisfaction = record[:satisfaction] ? record[:satisfaction].to_f : nil
					job_name = record[:job_name] ? record[:job_name] : nil
					job_salary = record[:job_salary] ? record[:job_salary].to_f : nil
					# Cents rating goes here
					cents_rating = 0

					result["major_#{index}"] = [salary, recommended, satisfaction, cents_rating]
					result["jobs_#{index}"].concat [job_name, job_salary]
					break
				end
			end

			# Keep track of which majors had neither exact nor state data.
			if not match
				no_data_for << major
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
