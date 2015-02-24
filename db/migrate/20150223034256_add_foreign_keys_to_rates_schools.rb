class AddForeignKeysToRatesSchools < ActiveRecord::Migration
  def change
    add_column :rates_schools, :user_id, :integer
    add_column :rates_schools, :university_id, :integer
  end
end
