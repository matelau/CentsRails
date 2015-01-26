class Api::V1::LogoutController < ApplicationController
	def destroy
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

		render json: result, status: 200
	end
end
