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

	# User forgot their password.
	def forgot
		unless User.exists?(email: params[:email])
			flash[:error] = 'Your credentials couldn\'t could be verified.'
			redirect_to forgot_password_path and return
		end
		user = User.find_by_email(params[:email])
		if params[:answer] == user.answer
			user.password = params[:password]
			user.password_confirmation = params[:password_confirmation]
			if user.save
				flash[:notice] = 'Password changed.'
				redirect_to forgot_password_path
			end
		else
			flash[:error] = 'Your credentials couldn\'t could be verified.'
			redirect_to forgot_password_path
		end
	end

private

	def user_params
		params.require(:user).permit(:first_name, :last_name, :email, 
			:email_type, :password, :password_confirmation)
	end

end
