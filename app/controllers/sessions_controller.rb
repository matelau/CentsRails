class SessionsController < ApplicationController

	def new
	end

	def create
		user = User.find_by_email(params[:email])

		if user && user.authenticate(params[:password])
			cents_members = @mc.lists.members(@list_id)
			if members
				puts members
			end
			session[:user_id] = user.id
			redirect_to '/'
		else
    	# If the user can't be authenticated, send them back to the same form.
			redirect_to '/user/login'
		end
	end

	def destroy
		session[:user_id] = nil
		redirect_to '/'
	end

end
