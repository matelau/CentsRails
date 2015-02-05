class Api::V1::LoginController < ApplicationController

	def create
		result = Hash.new
		error_list = []

  	# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:email].present?
			error_list.append "email was missing"
		end

		unless params[:password].present?
			error_list.append "password was missing"
		end

		unless error_list.empty?
			result[:errors] = error_list
			return render json: result, status: 400
		end

		# Search for the user.
		user = User.find_by_email(params[:email])

		# Try to authenticate the user and finish.
		if user && user.authenticate(params[:password])
			return render json: result, status: 200
		else
			error_list.append "authentication failed"
			result[:errors] = error_list
			return render json: result, status: 400
		end
	end

end
