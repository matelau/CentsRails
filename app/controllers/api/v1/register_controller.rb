class Api::V1::RegisterController < ApplicationController

	#force_ssl

  def create
  	result = Hash.new
  	error_list = []
  	
  	# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:first_name].present?
			error_list.append "first_name was missing"
		end

		unless params[:last_name].present?
			error_list.append "last_name was missing"
		end

		unless params[:email].present?
			error_list.append "email was missing"
		end

		unless params[:password].present?
			error_list.append "password was missing"
		end

		unless params[:password_confirmation].present?
			error_list.append "password_confirmation was missing"
		end

		unless params[:email_type].present?
			error_list.append "email_type was missing"
		end

		unless error_list.empty?
			result[:errors] = error_list
			return render json: result, status: 400
		end

		# Create a new user.
		user = User.new(first_name: params[:first_name],
										last_name: params[:last_name],
										email: params[:email],
										password: params[:password],
										password_confirmation: params[:password_confirmation],
										email_type: params[:email_type])

		# Check that the first name, last name, etc., meet the User model's requirements.
		unless user.valid?
			user.errors.messages.each do |message|
				error_list.append "#{message[0]} #{message[1][0]}"
			end
			result[:errors] = error_list
			return render json: result, status: 400
		end

		# Check that the user is not already registered.
		# Create a MailChimp API object and the list ID for the New Cents Users list.
		mc = Mailchimp::API.new('96bf81c0c618d011dfe85bc9b312d1c5-us10')
		list_id = '2f68e3af0f'
		in_list = false
		cents_members = mc.lists.members(list_id)
		cents_members['data'].each do |member|
			if member['email'] == user.email
				in_list = true
			end
		end
		if in_list
			return render json: "User is already registered", status: 400
		end

		# Attempt to save the user and finish.
		if user.save
			session[:user_id] = user.id
			result[:user] = "#{params[:first_name]} #{params[:last_name]}"
			return render json: result, status: 200
		else
			return render json: result, status: 400
		end
	end

end
