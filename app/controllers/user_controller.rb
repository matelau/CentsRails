class UserController < ApplicationController

	def create

		new_user = User.new(user_params)
		@@mc.lists.subscribe(@@list_id, 
                   {"email" => user_params[:email]},
                   {"FNAME" => user_params[:first_name],
                   	"LNAME" => user_params[:last_name],
                   	"EMAIL" => user_params[:email]},
                   	user_params[:email_type])

		if new_user.save
			redirect_to '/user/registered'
		else
			redirect_to '/user/register'
		end
	end

private

	def user_params
		params.require(:user).permit(:first_name, :last_name, :email, 
			:email_type, :password, :password_confirmation)
	end

end
