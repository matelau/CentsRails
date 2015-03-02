class Api::V1::SpendingBreakdownController < ApplicationController

	# Load spending breakdown data.
	def load
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

		unless params[:fields].present?
			error_list << 'The fields array was empty'
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
