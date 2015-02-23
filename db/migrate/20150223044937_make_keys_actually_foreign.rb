class MakeKeysActuallyForeign < ActiveRecord::Migration
  def change
		add_foreign_key :rates_schools, :users
		add_foreign_key :rates_schools, :universities
  end
end
