class UserController < ApplicationController

	def create
		# Check that the user doesn't already exist.
		if User.find_by_email(params[:email])
			redirect_to '/user/register'
		end

		to_be_validated_user = ToBeValidatedUser.new(user_params)
		confirmation_code = SecureRandom.urlsafe_base64

		to_be_validated_user.confirmation_code = confirmation_code

		# Add back when server set up.
		UserMailer.confirmation_email(to_be_validated_user).deliver

		if to_be_validated_user.save
			redirect_to registered_path(confirmation_code: confirmation_code)
		else
			redirect_to '/user/register'
		end
	end

private

	def user_params
		params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
	end

end
