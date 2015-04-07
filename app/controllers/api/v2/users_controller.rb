class Api::V2::UsersController < ApplicationController

	QUERY_COUNT = 20

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

	# Record that a user made a query.
	def create_query
		query = Query.new
		query.user_id = params[:id]
		query.url = params[:url]

		# Attempt to save the query and finish.
		if query.save
			return render json: 'Query saved.', status: 200
		else
			return render json: query.errors, status: 400
		end
	end

	# Get profile data.
	def show
		result = Hash.new

		# Search for the user.
		user = User.find(params[:id])

		# Get user data.
		if user
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

			# Add career rating data.
			user[:career_ratings] = Array.new
			records = Career.find_by_sql [
				'SELECT d.name,
								r.rating
				FROM careers AS d 
				INNER JOIN rates_careers AS r
				ON d.id = r.career_id
				WHERE r.user_id = ?',
				params[:id]
			]
			records.each do |record|
				user[:career_ratings] << record.attributes.except('id', 'created_at', 'updated_at')
			end

			# Add degree rating data.
			user[:degree_ratings] = Array.new
			records = Degree.find_by_sql [
				'SELECT d.name,
								d.level,
								r.rating
				FROM degrees AS d 
				INNER JOIN rates_majors AS r
				ON d.id = r.degree_id
				WHERE r.user_id = ?',
				params[:id]
			]
			records.each do |record|
				user[:degree_ratings] << record.attributes.except('id', 'created_at', 'updated_at')
			end

			# Add school rating data.
			user[:school_ratings] = Array.new
			records = University.find_by_sql [
				'SELECT s.name,
								r.rating
				FROM universities AS s 
				INNER JOIN rates_schools AS r
				ON s.id = r.university_id
				WHERE r.user_id = ?',
				params[:id]
			]
			records.each do |record|
				user[:school_ratings] << record.attributes.except('id', 'created_at', 'updated_at')
			end

			# Add past queries.
			user[:queries] = Array.new
			records = Query.find_by_sql [
				'SELECT url
				FROM queries
				WHERE user_id = ?
				ORDER BY created_at DESC
				LIMIT ?',
				params[:id],
				QUERY_COUNT
			]

			records.each do |record|
				user[:queries] << record.url
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

	# Get queries for a user.
	def show_query
		#records = Query.where(user_id: params[:id]).order(created_at: :asc).limit(@query_count)
		records = Query.find_by_sql [
			'SELECT url
			FROM queries
			WHERE user_id = ?
			ORDER BY created_at DESC
			LIMIT ?',
			params[:id],
			QUERY_COUNT
		]
		queries = Array.new

		records.each do |record|
			queries << record.url
		end
		return render json: queries, status: 200
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

	# Update some of a user's fields.
	def update
		user = User.find(params[:id])

		if user.present?
			params[:fields].each do |field|
				user.write_attribute("#{field[:name]}", field[:value])
			end
		else
			return render json: 'User not found.', status: 404
		end

		if user.save
			return render json: 'User saved.', status: 200
		else
			return render json: user.errors, status: 500
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
			result[:id] = user.id
			return render json: result, status: 200
		else
			result[:errors] = 'authentication failed'
			return render json: result, status: 400
		end
	end
end
