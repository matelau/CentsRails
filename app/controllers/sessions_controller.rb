class SessionsController < ApplicationController

	def new
	end

	# Log in the user by creating a session.
	def create
		@user = User.find_by_email(params[:email])

		Rails.logger = Logger.new(STDOUT)
		Rails.logger.level = 0
		logger.debug "user: #{@user.attributes.inspect}"

		# Check that the user passes the model's tests.
		if @user && @user.authenticate(params[:password])
			logger.debug "user: #{@user.attributes.inspect}"

			# Check that the user is in the MailChimp list.
			# cents_members is a hash with 'total' and 'data' fields.
			# cents_members['data'] is an array of member data.
			# cents_members['data'][0]['email'] is the first member's email.
			in_list = false
			cents_members = @@mailchimp.lists.members(@@mc_list_id)
			cents_members['data'].each do |member|
				if member['email'] == @user.email
					in_list = true
				end
			end
			if in_list
				session[:user_id] = @user.id
				redirect_to '/'
			end
		else
    	# If the user can't be authenticated, send them back to the same form.
			redirect_to user_login_path
		end
	end

	def destroy
		session[:user_id] = nil
		redirect_to '/'
	end

end
