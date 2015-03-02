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

		unless params[:operation].present?
			error_list << 'The operation field was empty'
		end

		unless error_list.empty?
			result[:errors] = error_list
			return render json: result, status: 400
		end
	end

end
