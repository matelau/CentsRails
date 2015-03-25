class Api::V2::SpendingBreakdownController < ApplicationController

	# Load spending breakdown data.
	def show
		result = Array.new

		unless User.exists? params[:id]
			return render json: 'No such user was found', status: 404
		end

		records = Amount.find_by_sql [
			'SELECT name, value, category
			 FROM users AS u
			 INNER JOIN amounts AS a
			 ON u.id = a.user_id
			 WHERE a.user_id = ?',
			 params[:id]
		]

		records.each do |record|
			result << record.attributes.except('id')
		end

		return render json: result, status: 200
	end

	# Save spending breakdown data.
	def update
		result = Hash.new
		error_list = []

		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:id].present?
			error_list << 'No user ID was present'
		end

		unless params[:fields].present? and params[:fields].kind_of?(Array)
			error_list << 'The fields param was not an array or was empty'
			result[:errors] = error_list
			return render json: result, status: 400
		end 

		params[:fields].each do |field|
			unless field[:name].present? and 
					field[:value].present? and 
					field[:category].present?
				error_list << 'Each field object must have a name, value and category'
			end
		end

		unless error_list.empty?
			result[:errors] = error_list
			return render json: result, status: 400
		end

		unless User.exists? params[:id]
			return render json: 'No such user was found', status: 404
		end

		# Save the data.
		params[:fields].each do |field|
			amount = Amount.new
			amount.user_id = params[:id]
			amount.name = field[:name]
			amount.value = field[:value]
			amount.category = field[:category]
			return render json: result, status: 500 unless amount.save
		end

		return render json: result, status: 200
	end
end
