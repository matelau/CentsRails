class RemoveLocationIdFromWeatherRecords < ActiveRecord::Migration
  def change
    remove_column :weather_records, :location_id, :integer
  end
end
