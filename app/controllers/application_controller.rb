class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
	protect_from_forgery with: :null_session

	# Use HTTPS.
	force_ssl

	# Create a MailChimp API object and the list ID for the New Cents Users list.
	@@mailchimp = Mailchimp::API.new('96bf81c0c618d011dfe85bc9b312d1c5-us10')
	@@mc_list_id = '2f68e3af0f'

	# Populate the @current_user variable.
	def current_user
		@current_user ||= User.find(session[:user_id]) if session[:user_id]
	end
	helper_method :current_user

	def authorize
		redirect_to '/login' unless current_user
	end

	def api_key_is_valid?
		if ApiKey.find_by_key(params[:api_key]).present?
			return true
		elsif User.find_by_api_key(params[:api_key]).present?
			return true
		else
			return false
		end
	end
  
end
