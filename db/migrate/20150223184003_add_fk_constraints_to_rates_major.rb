class AddFkConstraintsToRatesMajor < ActiveRecord::Migration
  def change
  	add_foreign_key :rates_majors, :users
		add_foreign_key :rates_majors, :degrees
  end
end
