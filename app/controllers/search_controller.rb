class SearchController < ApplicationController
  def index
  end

  def getPartial
  	render partial: '/partials/' + params[:query_type]
  end

end
