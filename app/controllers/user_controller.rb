class UserController < ApplicationController

	def create
		user = User.new(user_params)

		# Check that the user is not already registered.
		cents_members = @@mailchimp.lists.members(@@mc_list_id)
		cents_members['data'].each do |member|
			if member['email'] == user.email
				flash[:error] = "You've already registered with this email."
				redirect_to '/user/register' and return
			end
		end

		# Subscribe with MailChimp's API.
		@@mailchimp.lists.subscribe(@@mc_list_id, 
				{"email" => user_params[:email]},
				{"FNAME" => user_params[:first_name],
					"LNAME" => user_params[:last_name],
					"EMAIL" => user_params[:email]},
					user_params[:email_type])

		user.api_key = SecureRandom.urlsafe_base64(24)

		if user.save
			redirect_to registered_path
		else
			flash[:error] = "That email address #{user.errors.values[0][0]}."
			redirect_to '/user/register'
		end
	end

private

	def user_params
		params.require(:user).permit(:first_name, :last_name, :email, 
			:email_type, :password, :password_confirmation)
	end

end
