class Api::V1::ColiController < ApplicationController
	def index
		render json: {message: 'Resource not found'}
  end
end
