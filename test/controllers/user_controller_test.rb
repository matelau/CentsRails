require 'test_helper'

class UserControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "removes rates_school record on destroy" do
  	user = users(:albert)
  	rating = rates_schools(:albert1)
  	user.destroy
  	assert_not RatesSchool.exists? rating
  end

  test "allows multiple school_ratings per user" do
  	albert = users(:albert)

  	rating1 = RatesSchool.new
  	rating1.user_id = albert.id
  	rating1.rating = 5
  	rating1.save

  	rating2 = RatesSchool.new
  	rating2.user_id = albert.id
  	rating2.rating = 5
  	rating2.save

  	assert rating1.persisted?
  	assert rating2.persisted?
  end

end
