class WizardController < ApplicationController

	force_ssl
	
	def start
		cookies[:skip] = "false"
	end
	def education
		cookies[:skip] = "false"
	end
	def career
		# if cookies[:skip] = true
		# 	@prev_link = "/wizard/major"
		# 	@prev_name = "(major)"
		# else
		# 	@prev_link = "/wizard/school"
		# 	@prev_name = "(school)"
		# end
	end
	def city
	end
	def school
	end
	def major
		if cookies[:skip] == "true"
			@next_link = "/wizard/career"
			@next_name = "(career)"
		else
			@next_link = "/wizard/school"
			@next_name = "(school)"
		end
	end

end
