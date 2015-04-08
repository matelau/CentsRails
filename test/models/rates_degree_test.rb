require 'test_helper'

class RatesDegreeTest < ActiveSupport::TestCase

	test "user_id is not nil" do
		rating = rates_majors(:albert_cs)
		rating.user_id = nil
		assert_not rating.save
	end

	test "degree_id is not nil" do
		rating = rates_majors(:albert_cs)
		rating.degree_id = nil
		assert_not rating.save
	end

	test "can't insert if user nonexistent" do
		rating = rates_majors(:albert_cs)
		rating.user_id = 9001
		assert_raises(ActiveRecord::InvalidForeignKey) { rating.save } 
	end

	test "can't insert if degree nonexistent" do
		rating = rates_majors(:albert_cs)
		rating.degree_id = 9001
		assert_raises(ActiveRecord::InvalidForeignKey) { rating.save } 
	end

	test "(user_id, degree_id) pairs are unique" do
  	# Try to save a record that's a duplicate except for id.
		rating = rates_majors(:albert_cs)
		rating.id = 500
		assert_not rating.save
	end

	test "removes rates_majors record on destroy user" do
		albert = users(:albert)
		rating = rates_majors(:albert_cs)
		albert.destroy
		assert_not RatesMajor.exists? rating
	end

	test "removes rates_majors record on destroy degree" do
		rating = rates_majors(:albert_cs)
		cs = degrees(:cs)
		cs.destroy
		assert_not RatesMajor.exists? rating
	end

	test "allows users to rate multiple majors" do
		albert = users(:albert)
		econ = degrees(:econ)
		bw = degrees(:bw)

		# Have Albert rate econ.
		rating1 = RatesMajor.new
		rating1.user_id = albert.id
		rating1.degree_id = econ.id
		rating1.rating = 4
		assert rating1.save

		# Have Albert rate basketweaving.
		rating2 = RatesMajor.new
		rating2.user_id = albert.id
		rating2.degree_id = bw.id
		rating2.rating = 1
		assert rating2.save
	end

	test "allows majors to be rated by multiple users" do
		albert = users(:albert)
		alice = users(:alice)
		econ = degrees(:econ)

		# Have Albert rate econ.
		rating1 = RatesMajor.new
		rating1.user_id = albert.id
		rating1.degree_id = econ.id
		rating1.rating = 4
		assert rating1.save

		# Have Alice rate econ.
		rating2 = RatesMajor.new
		rating2.user_id = alice.id
		rating2.degree_id = econ.id
		rating2.rating = 5
		assert rating2.save
	end
end
