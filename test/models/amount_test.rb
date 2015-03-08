require 'test_helper'

class AmountTest < ActiveSupport::TestCase
	test "user_id is not nil" do
		amount = amounts(:albert_taxes)
		amount.user_id = nil
		assert_not amount.save
	end

	test "removes amount record on destroy user" do
		albert = users(:albert)
		amount = amounts(:albert_taxes)
		albert.destroy
		assert_not Amount.exists? amount
	end

	test "allows users to have multiple amounts" do
		albert = users(:albert)

		# Give Albert a dog cake spending category.
		dog_cakes = Amount.new
		dog_cakes.user_id = albert.id
		dog_cakes.name = "Dog cakes"
		dog_cakes.value = 1000
		assert dog_cakes.save

		# Give Albert a dog sweater spending category.
		dog_sweaters = Amount.new
		dog_sweaters.user_id = albert.id
		dog_sweaters.name = "Dog sweaters"
		dog_sweaters.value = 500
		assert dog_sweaters.save
	end
end
