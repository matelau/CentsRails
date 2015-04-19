class SessionsController < ApplicationController

	def new
	end

	# Log in the user by creating a session.
	def create
		user = User.find_by_email(params[:email])

		# Check that the user passes the model's tests.
		if user && user.authenticate(params[:password])

			# Check that the user is in the MailChimp list.
			# cents_members is a hash with 'total' and 'data' fields.
			# cents_members['data'] is an array of member data.
			# cents_members['data'][0]['email'] is the first member's email.
			in_list = false
			cents_members = @@mailchimp.lists.members(@@mc_list_id)
			cents_members['data'].each do |member|
				if member['email'] == user.email
					in_list = true
				end
			end
			if in_list
				user.api_key = SecureRandom.urlsafe_base64(24)
				user.save
				session[:user_id] = user.id
				redirect_to '/'
			else
				redirect_to user_login_path
			end
		else
    	# If the user can't be authenticated, send them back to the same form.
			redirect_to user_login_path
		end
	end

	def destroy
		user = User.find(session[:user_id])
		user.api_key = nil
		user.save
		session[:user_id] = nil
		redirect_to '/'
	end

end
