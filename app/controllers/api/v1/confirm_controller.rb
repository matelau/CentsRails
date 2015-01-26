class Api::V1::ConfirmController < ApplicationController
	def show
		result = Hash.new
		error_list = []

  	# Check for the required fields and return an appropriate message if
		# they are not present.
		unless params[:confirmation_code].present?
			error_list.append "confirmation code was missing"
		end

		unless error_list.empty?
			result[:errors] = error_list
			return render json: result, status: 400
		end

		# Search for the user.
		to_be_validated_user = ToBeValidatedUser.find_by_confirmation_code(params[:confirmation_code])

		# Try to save the user.
		if user && user.authenticate(params[:password])
			return render json: result, status: 200
		else
			error_list.append "authentication failed"
			result[:errors] = error_list
			return render json: result, status: 400
		end

	end
end
