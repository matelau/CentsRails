class UserMailer < ActionMailer::Base
	default from: 'notifications@example.com'
 
	def confirmation_email(user)
		@user = user
		@url  = "https://localhost.com:3000/confirm?confirmation_code=#{@user.confirmation_code}"
		mail(to: @user.email, subject: 'Confirm your email for TryCents.com')
  end
end
