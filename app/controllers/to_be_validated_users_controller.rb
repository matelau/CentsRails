class ToBeValidatedUsersController < ApplicationController

	def confirm
		# Find the pending user by confirmation code, which has a high probability of being unique.
		tbvu = ToBeValidatedUser.find_by_confirmation_code(params[:confirmation_code])

		# Create a new valid user based on the pending user.
		user = User.new(first_name: tbvu.first_name, 
										last_name: tbvu.last_name, 
										email: tbvu.email, 
										password_digest: tbvu.password_digest)

		# Save the user.
		if user.save
			# Log the user in.
			session[:user_id] = user.id

			# Remove the user from the pending users table.
			tbvu.destroy
		end

		# Redirect.
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
