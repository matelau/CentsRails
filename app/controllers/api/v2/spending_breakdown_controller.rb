class Api::V2::SpendingBreakdownController < ApplicationController

	# Load all spending breakdown data.
	def show
		unless api_key_is_valid?
			return render json: 'Invalid API key.', status: 401
		end

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

	# Load spending breakdown data by category.
	def show_category
		unless api_key_is_valid?
			return render json: 'Invalid API key.', status: 401
		end

		result = Array.new

		unless User.exists? params[:id]
			return render json: 'No such user was found', status: 404
		end

		records = Amount.find_by_sql [
			'SELECT name, value, category
			 FROM users AS u
			 INNER JOIN amounts AS a
			 ON u.id = a.user_id
			 WHERE a.user_id = ? AND category = ?',
			 params[:id], params[:category]
		]

		records.each do |record|
			result << record.attributes.except('id')
		end

		return render json: result, status: 200
	end


	# Save new spending breakdown data.
	def update
		unless api_key_is_valid?
			return render json: 'Invalid API key.', status: 401
		end

		result = Hash.new
		error_list = []

		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:fields].present? and params[:fields].kind_of?(Array)
			error_list << 'The fields param was not an array or was empty'
			result[:errors] = error_list
			return render json: result, status: 400
		end 

		params[:fields].each do |field|
			unless field[:name].present? and 
					field[:value].present?
				error_list << 'Each field object must have a name and value'
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

			# Check if this item already exists.
			amount = Amount.where(user_id: params[:id])
										.where(category: params[:category])
										.where(name: field[:name])
										.first
			unless amount.present?
				amount = Amount.new
			end

			amount.user_id = params[:id]
			amount.name = field[:name]
			amount.value = field[:value]
			amount.category = params[:category]
			
			return render json: result, status: 500 unless amount.save
		end

		return render json: result, status: 200
	end

	# Save new spending breakdown data.
	def update_all
		unless api_key_is_valid?
			return render json: 'Invalid API key.', status: 401
		end

		result = Hash.new
		error_list = []

		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:fields].present? and params[:fields].kind_of?(Array)
			error_list << 'The fields param was not an array or was empty'
			result[:errors] = error_list
			return render json: result, status: 400
		end 

		params[:fields].each do |field|
			unless field[:name].present? and 
					field[:value].present?
				error_list << 'Each field object must have a name and value'
			end
		end

		unless error_list.empty?
			result[:errors] = error_list
			return render json: result, status: 400
		end

		unless User.exists? params[:id]
			return render json: 'No such user was found', status: 404
		end

		# Remove the old data.
		Amount.where(
			user_id: params[:id], 
			category: params[:category]
			).destroy_all

		# Save the new data.
		params[:fields].each do |field|

			# Check if this item already exists.
			amount = Amount.where(user_id: params[:id])
										.where(category: params[:category])
										.where(name: field[:name])
										.first
			unless amount.present?
				amount = Amount.new
			end

			amount.user_id = params[:id]
			amount.name = field[:name]
			amount.value = field[:value]
			amount.category = params[:category]
			
			return render json: result, status: 500 unless amount.save
		end

		return render json: result, status: 200
	end


  # Remove a single item of spending breakdown data.
	def destroy
		unless api_key_is_valid?
			return render json: 'Invalid API key.', status: 401
		end

		Amount.where(
			user_id: params[:id], 
			category: params[:category], 
			name: params[:name]
			).destroy_all

		return render json: Hash.new, status: 200
	end
end
