class AddLocationToWeatherRecord < ActiveRecord::Migration
  def change
    add_reference :weather_records, :location, index: true
  end
end
