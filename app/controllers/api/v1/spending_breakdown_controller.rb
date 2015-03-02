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

		unless params[:operation].present?
			error_list << 'The operation field was empty'
		end

		unless error_list.empty?
			result[:errors] = error_list
			return render json: result, status: 400
		end

		params[:fields].each do |field|
			amount = Amount.new
			amount.user_id = params[:user_id]
			amount.name = field[:name]
			amount.value = field[:value]
			amount.category = field[:category]
			unless amount.save return render json: result, status: 500
		end

		return render json: result, status: 200
	end

end
