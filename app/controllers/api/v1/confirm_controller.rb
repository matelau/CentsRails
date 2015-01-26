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
		tbvu = ToBeValidatedUser.find_by_confirmation_code(params[:confirmation_code])
		user = User.new({ first_name: tbvu.first_name, 
											last_name: tbvu.last_name, 
											email: tbvu.email, 
											password_digest: tbvu.password_digest})

		# Try to save the user.
		if user.save
			tbvu.destroy
			return render json: result, status: 200
		else
			error_list.append "authentication failed"
			result[:errors] = error_list
			return render json: result, status: 400
		end

	end
end
