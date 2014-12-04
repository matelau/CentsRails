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
	# TODO:	(1) Accept JSON data using the correct protocol.
	# 			(2) Retrieve weather data also.
	#				(3) Error checking, including reasonable status codes for bad input.
	def show
		render json: Coli.find(params[:id]), status: 200
	end
end
