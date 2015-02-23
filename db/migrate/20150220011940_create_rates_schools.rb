class CreateRatesSchools < ActiveRecord::Migration
  def change
    create_table :rates_schools do |t|
      t.integer :rating

      t.timestamps
    end
  end
end
