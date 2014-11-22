class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :city_state

      t.timestamps
    end
  end
end
