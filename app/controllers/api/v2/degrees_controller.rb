class Api::V2::DegreesController < ApplicationController

	# Get degree record names for autocomplete.
	def index
		result = Array.new

		if params[:level] and not (params[:only_level_names] == 'true')
			records = Degree.select('DISTINCT name, level').where(['level like ?', "#{params[:level]}%"])

			records.each do |record|
				result << "#{record[:name]} (#{record[:level]})"
			end

		elsif params[:only_level_names] == 'true' and not params[:level]
			records = Degree.select('DISTINCT level')
			records.each do |record|
				result << record[:level]
			end

		elsif (not (params[:only_level_names] == 'true')) and (not params[:level])
			records = Degree.select('DISTINCT name, level')
			
			records.each do |record|
				if not record[:name]
					result << record[:level]
				else
					result << "#{record[:name]} (#{record[:level]})"
				end
			end

		else
			records = Degree.select('DISTINCT level').where(['level like ?', "#{params[:level]}%"])
			records.each do |record|
				result << record[:level]
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

	# Get degree by name.
	def show
		records = Degree.where(name: params[:name])
		degrees = Array.new

		records.each do |record|
			degrees << record.attributes.except('id', 'created_at', 'updated_at')
		end

		if degrees.present?
			return render json: degrees, status: 200
		else
			return render json: [], status: 404
		end
	end

	# Get degrees by level and name.
	def show_level_name
		records = Degree.where(['level like ? and name = ?', "#{params[:level]}%", params[:name]])
		degrees = Array.new

		records.each do |record|
			degrees << record.attributes.except('id', 'created_at', 'updated_at')
		end

		if degrees.present?
			return render json: degrees, status: 200
		else
			return render json: [], status: 404
		end
	end

	# Get degree data for two degrees.
	def show_two
		result = Hash.new

		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:degrees].present?
			return render json: 'No objects were in the degrees array.', status: 400
		end

		# Order the degrees.
		degrees = Array.new
		if params[:degrees][0][:order] and params[:degrees][1][:order]
			params[:degrees].each do |degree|
				if degree[:order] == 1
					degrees << degree
				end
			end
			params[:degrees].each do |degree|
				if degree[:order] == 2
					degrees << degree
				end
			end
		else
			params[:degrees].each do |degree|
				degrees << degree
			end
		end

		# Create a string of the form 'd.name = ? OR ... ' and a list of degree names.
		# This string and list will be used to dynamically create the where clause
		# for the query.
		where_string = ""
		where_params = Array.new
		degrees.each do |degree|
			where_string += 'd.name = ? OR '
			where_params << degree[:name].strip
		end
		where_string = where_string[0..-5]	# Strip off the last ' OR '.

		records = Degree.find_by_sql [
			"SELECT d.name AS degree_name,
							d.level,
							d.salary AS degree_salary,
							d.recommend,
							d.meaningful,
							j.name AS job_name,
							j.salary AS job_salary
			FROM degrees AS d
			LEFT OUTER JOIN top_jobs AS j
			ON d.id = j.degree_id
			WHERE #{where_string}",
			*where_params
		]

		no_data_for = Array.new

		# Iterate over each degree, keeping track of the degree's index.
		# (The index is needed because that's how the view tracks degrees.)
		index = 1
		degrees.each do |degree|
			match = false

			# Search through the retrieved records for an exact match.
			records.each do |record|
				if record[:degree_name] == degree[:name].strip and record[:level] == degree[:level]
					match = true
					salary = record[:degree_salary] ? record[:degree_salary].to_f : nil
					recommended = record[:recommend] ? record[:recommend].to_f : nil
					meaningful = record[:meaningful] ? record[:meaningful].to_f : nil
					job_name = record[:job_name] ? record[:job_name] : nil
					job_salary = record[:job_salary] ? record[:job_salary].to_f : nil
					# Cents rating goes here
					cents_rating = 0

					result["name_#{index}"] = "#{record[:degree_name]} (#{record[:level]})"
					result["degree_#{index}"] = [salary, recommended, meaningful, cents_rating]
					result["jobs_#{index}"] = Array.new
					result["jobs_#{index}"].concat [job_name, job_salary]
					break
				end
			end

			# Keep track of which degrees had neither exact nor state data.
			if not match
				no_data_for << "#{degree[:degree_name]} (#{degree[:level]})"
			end

			# Increment for next object.
			index += 1
		end

		# If there is no data for a degree, send an error message.
		unless no_data_for.empty?
			result[:error] = 'No data on some degrees'
			result[:no_data_for] = no_data_for
			result[:operation] = 'undefined' # Needed for the query parser.
			return render json: result, status: 404
		end

		result[:operation] = params[:operation]

		# Return the result, formatted as JSON, and with a 200 OK HTTP code.
		render json: result, status: 200
	end
end
