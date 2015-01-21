class Api::V1::RegisterController < ApplicationController

	force_ssl

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
			result[:user_id] = user.id

			return_user = {:first_name => params[:first_name], 
											:last_name => params[:last_name],
											:email => params[:email]}

			result[:object] = return_user
			return render json: result, status: 200
		else
			result[:message] = "Failed"
			result[:object] = user
			return render json: result, status: 400
		end
	end

end
