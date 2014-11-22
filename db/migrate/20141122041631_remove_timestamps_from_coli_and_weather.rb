class RemoveTimestampsFromColiAndWeather < ActiveRecord::Migration
  def change
    remove_column :weather_records, :created_at, :datetime
    remove_column :weather_records, :updated_at, :datetime
  end
end
