class Api::V1::ColiController < ApplicationController
### Just for testing
#	def index
#		if params[:id]  	
#			render json: Coli.find(params[:id]), status: 200
#		else
#			render json: 'Enter an ID.'
#		end
#	end

	# Retrieve all location data by location name.
	# (Well, it SHOULD. Right now it looks up some location data by ID.)
	# 			(2) Retrieve weather data also.
	def show
		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:search_by]
			message = {'error' => 
				"The search_by field was empty. It should be a column name."}
			render json: message, status: 400
			return
		end

		unless params[:operation]
			message = {'error' => 
				"The operation field was empty. It should be something like 'get.'"}
			render json: message, status: 400
			return
		end
	
		unless params[:objects]
			message = {'error' => 
				"The objects field was empty. It should be an array."}
			render json: message, status: 400
			return
		end

#		render json: Coli.where(location: params['search_by']), status: 200
		render json: Coli.where(["? = ?", 
														params[:search_by], 
														params[:objects][0]["base city"]]) # TODO: iterate
	end
end
