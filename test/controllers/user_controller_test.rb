require 'test_helper'

class UserControllerTest < ActionController::TestCase

	test "user_id is not nil" do
		rating = rates_schools(:albert_princeton)
		rating.user_id = nil
		assert_not rating.save
	end

	test "university_id is not nil" do
		rating = rates_schools(:albert_princeton)
		rating.university_id = nil
		assert_not rating.save
	end

	test "(user_id, university_id) pairs are unique" do
  	# Try to save a record that's a duplicate except for id.
		rating = rates_schools(:albert_princeton)
		rating.id = 50
		assert_not rating.save
	end

	test "removes rates_school record on destroy user" do
		albert = users(:albert)
		rating = rates_schools(:albert_princeton)
		albert.destroy
		assert_not RatesSchool.exists? rating
	end

	test "removes rates_school record on destroy university" do
		rating = rates_schools(:albert_princeton)
		princeton = universities(:princeton)
		princeton.destroy
		assert_not RatesSchool.exists? rating
	end

	test "allows users to rate multiple universities" do
		albert = users(:albert)
		u = universities(:u)
		byu = universities(:byu)

		# Have Albert rate the U.
		rating1 = RatesSchool.new
		rating1.user_id = albert.id
		rating1.university_id = u.id
		rating1.rating = 5
		assert rating1.save

		# Have Albert rate Harvard.
		rating2 = RatesSchool.new
		rating2.user_id = albert.id
		rating2.university_id = byu.id
		rating2.rating = 1
		assert rating2.save
	end

	test "allows universities to be rated by multiple users" do
		albert = users(:albert)
		alice = users(:alice)
		u = universities(:u)

		# Have Albert rate the U.
		rating1 = RatesSchool.new
		rating1.user_id = albert.id
		rating1.university_id = u.id
		rating1.rating = 1
		assert rating1.save

		# Have Alice rate the U.
		rating2 = RatesSchool.new
		rating2.user_id = alice.id
		rating2.university_id = u.id
		rating2.rating = 3
		assert rating2.save
	end
end
