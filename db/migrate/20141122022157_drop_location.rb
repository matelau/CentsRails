class DropLocation < ActiveRecord::Migration
  def up
    drop_table :locations
  end

  def down
    create_table :location do |t|
      t.string :city_state
      t.references :coli
      t.references :weather_record
      t.timestamps
    end
  end
end
