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

	# Get a user's estimate annual income for the spending breakdown.
	def show_income
		unless api_key_is_valid?
			return render json: 'Invalid API key.', status: 401
		end

		unless params[:id].present?
			return render json: 'You must supply a user ID.', status: 400
		end

		unless User.exists? params[:id]
			return render json: 'No such user found.', status: 404
		end

		user = User.find(params[:id])
		return render json: user.sb_annual_income, status: 200		
	end


	# Save new spending breakdown data.
	def update
		unless api_key_is_valid?
			return render json: 'Invalid API key.', status: 401
		end

		result = Hash.new

		unless params[:fields].present? and params[:fields].kind_of?(Hash)
			return render json: 'The fields param was not present or not a hash.', status: 400
		end

		unless User.exists? params[:id]
			return render json: 'No such user was found', status: 404
		end

		# Save the data.
		params[:fields].each do |k, v|

			# Check if this item already exists.
			amount = Amount.where(user_id: params[:id])
										.where(category: params[:category])
										.where(name: k)
										.first
			unless amount.present?
				amount = Amount.new
			end

			amount.user_id = params[:id]
			amount.name = k
			amount.value = v
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

		unless params[:fields].present? and params[:fields].kind_of?(Hash)
			return render json: 'The fields param was not present or not a hash.', status: 400
		end

		unless User.exists? params[:id]
			return render json: 'No such user was found', status: 404
		end

		# Remove the old data.
		Amount.where(
			user_id: params[:id], 
			category: params[:category]
			).destroy_all

		# Save the data.
		params[:fields].each do |k, v|

			# Check if this item already exists.
			amount = Amount.where(user_id: params[:id])
										.where(category: params[:category])
										.where(name: k)
										.first
			unless amount.present?
				amount = Amount.new
			end

			amount.user_id = params[:id]
			amount.name = k
			amount.value = v
			amount.category = params[:category]
			
			return render json: result, status: 500 unless amount.save
		end

		return render json: result, status: 200
	end

	# Change the user's estimated annual income for the spending breakdown.
	def update_income
		unless api_key_is_valid?
			return render json: 'Invalid API key.', status: 401
		end

		unless params[:id].present?
			return render json: 'You must supply a user ID.', status: 400
		end

		unless User.exists? params[:id]
			return render json: 'No such user found.', status: 404
		end

		user = User.find(params[:id])
		user.sb_annual_income = params[:income]
		if user.save
			return render json: 'Changes saved.', status: 200
		else
			return render json: 'Server error while saving.', status: 500
		end
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
