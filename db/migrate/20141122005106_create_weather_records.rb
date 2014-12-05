class CreateWeatherRecords < ActiveRecord::Migration
  def change
    create_table :weather_records do |t|
      t.float :high
      t.float :low
      t.float :average

      t.timestamps
    end
  end
end
