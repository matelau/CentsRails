class CreateRatesMajors < ActiveRecord::Migration
  def change
    create_table :rates_majors do |t|
      t.integer :user_id
      t.integer :degree_id
      t.integer :rating

      t.timestamps
    end
  end
end
