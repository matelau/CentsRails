class Api::V1::ColiController < ApplicationController
	def index
		if params[:id]  	
			render json: Coli.find(params[:id]), status: 200
		else
			render json: 'Enter an ID.'
    end
	end

  def show
		render json: Coli.find(params[:id]), status: 200
  end
end
