class ToBeValidatedUsersController < ApplicationController
	
	def create
		to_be_validated_user = ToBeValidatedUser.new(user_params)
		to_be_validated_user.confirmation_code = SecureRandom.urlsafe_base64

		if to_be_validated_user.save
			redirect_to '/user/confirm'
		else
			redirect_to '/user/register'
		end
	end

private

	def user_params
		params.require(:user).permit(:first_name, 
			:last_name, 
			:email, 
			:password, 
			:password_confirmation)
	end

end
