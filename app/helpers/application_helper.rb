module ApplicationHelper

	# Set the page title.
	def title(page_title)
  	content_for(:title) { page_title }
	end
end
