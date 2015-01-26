class ToBeValidatedUsersController < ApplicationController

	def confirm
		tbvu = ToBeValidatedUser.find_by_confirmation_code(params[:confirmation_code])
		user = User.new(first_name: tbvu.first_name, 
										last_name: tbvu.last_name, 
										email: tbvu.email, 
										password_digest: tbvu.password_digest)
		if user.save
			tbvu.destroy
		end
		redirect_to '/user/confirmed'
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
