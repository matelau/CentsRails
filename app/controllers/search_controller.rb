class SearchController < ApplicationController
  def index
  end

  def getPartial
  	#if params[:query_type] == 'city'
  	render partial: '/partials/' + params[:query_type]
  	#end
  end

end
