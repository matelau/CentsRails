class Api::V1::RegisterController < ApplicationController

  def create
  	result = Hash.new
		user = User.new(:first_name => params[:first_name],
										:last_name => params[:last_name],
										:email => params[:email],
										:password => params[:password],
										:password_confirmation => params[:password_confirmation])
		if user.save
			session[:user_id] = user.id
			result[:message] = "Saved"
			result[:object] = user
			return render json: result, status: 200
		else
			result[:message] = "Failed"
			result[:object] = user
			return render json: result, status: 400
		end
	end

end
