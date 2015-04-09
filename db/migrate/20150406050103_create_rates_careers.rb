class CreateRatesCareers < ActiveRecord::Migration
  def change
    create_table :rates_careers do |t|
      t.integer :user_id
      t.integer :career_id
      t.integer :rating

      t.timestamps
    end
  end
end
