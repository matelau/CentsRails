class Api::V2::UsersController < ApplicationController

	# Register a new user.
	def create
  	result = Hash.new
  	error_list = []
  	
  	# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:first_name].present?
			error_list.append 'first_name was missing'
		end

		unless params[:last_name].present?
			error_list.append 'last_name was missing'
		end

		unless params[:email].present?
			error_list.append 'email was missing'
		end

		unless params[:password].present?
			error_list.append 'password was missing'
		end

		unless params[:password_confirmation].present?
			error_list.append 'password_confirmation was missing'
		end

		unless params[:email_type].present?
			error_list.append 'email_type was missing'
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
				break
			end
		end
		if in_list
			return render json: 'User is already registered', status: 400
		end

		# Attempt to save the user and finish.
		if user.save
			session[:user_id] = user.id
			result[:id] = user.id
			return render json: result, status: 200
		else
			return render json: result, status: 400
		end
	end

	# Get profile data.
	def show
		result = Hash.new

		# Search for the user.
		user = User.find(params[:id])

		# Try to authenticate the user and finish.
		if user && user.authenticate(params[:password])
			user = user.as_json
			
			# Add completed section data.
			user[:completed_sections] = Array.new
			Completed.where(user_id: params[:id]).each do |section|
				user[:completed_sections] << section[:section]
			end

			# Add spending breakdown data.
			user[:spending_breakdown_data] = Array.new
			records = Amount.find_by_sql [
			'SELECT name, value, category
			 FROM amounts
			 WHERE user_id = ?',
			 params[:id]
			]
			records.each do |record|
				user[:spending_breakdown_data] << record.attributes.except('id', 'created_at', 'updated_at')
			end
			
			return render json: user.except('created_at', 'updated_at', 'password_digest'), status: 200
		else
			result[:errors] = 'authentication failed'
			return render json: result, status: 400
		end
	end

	# Show which sections a user has completed.
	def show_completed
		result = Hash.new

		if User.exists? params[:id]
			completed_sections = Array.new
			records = Completed.where(user_id: params[:id])

			records.each do |record|
				completed_sections << record[:section]
			end

			return render json: completed_sections, status: 200
		else
			result[:errors] = 'No such user found.'
			return render json: result, status: 404
		end
	end

	# Record that a user has completed a section.
	def create_completed
		# Check that the section isn't already completed.
		old_section = Completed.where(user_id: params[:id]).where(section: params[:section])
		if old_section.present?
			return render json: 'Section already completed.', status: 400
		else
			new_section = Completed.new
			new_section.user_id = params[:id]
			new_section.section = params[:section]

			if new_section.save
				return render json: 'Saved.', status: 200
			else
				return render json: 'Server error.', status: 500
			end
		end
	end

	# Validate a username and password.
	def validate
		result = Hash.new

		unless params[:password].present?
			return render json: 'password was missing', status: 400
		end

		# Search for the user.
		user = User.find_by_email(params[:email])

		# Try to authenticate the user and finish.
		if user && user.authenticate(params[:password])
			result[:name] = "#{user.first_name} #{user.last_name}"
			result[:id] = user.id
			return render json: result, status: 200
		else
			result[:errors] = 'authentication failed'
			return render json: result, status: 400
		end
	end
end
