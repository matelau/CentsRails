class Api::V1::SpendingBreakdownController < ApplicationController

	# Delete a user's spending breakdown data.
	def delete
		result = Hash.new
		error_list = []

		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:name].present?
			error_list << 'The name parameter was missing'
		end

		unless params[:category].present?
			error_list << 'The value category was missing'
		end

		unless error_list.empty?
			result[:errors] = error_list
			return render json: result, status: 400
		end

		unless User.exists? params[:user_id]
			return render json: 'No such user was found', status: 404
		end

		success = Amount.where(['name = ? and and category = ?', 
							params[:name], params[:category]]).destroy_all

		return render json: 'The server couldn\'t delete', status: 500 unless success

		return render json: result, status: 200
	end

	# Load spending breakdown data.
	def load
		result = Array.new
		error_list = []

		unless User.exists? params[:user_id]
			return render json: 'No such user was found', status: 404
		end

		records = Amount.find_by_sql [
			'SELECT name, value, category
			 FROM users AS u
			 INNER JOIN amounts AS a
			 ON u.id = a.user_id
			 WHERE a.user_id = ?',
			 params[:user_id]
		]

		records.each do |record|
			result << record.attributes.except('id')
		end

		return render json: result, status: 200
	end

	# Save spending breakdown data.
	def save
		result = Hash.new
		error_list = []

		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:user_id].present?
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

		unless User.exists? params[:user_id]
			return render json: 'No such user was found', status: 404
		end

		# Save the data.
		params[:fields].each do |field|
			amount = Amount.new
			amount.user_id = params[:user_id]
			amount.name = field[:name]
			amount.value = field[:value]
			amount.category = field[:category]
			return render json: result, status: 500 unless amount.save
		end

		return render json: result, status: 200
	end

end
