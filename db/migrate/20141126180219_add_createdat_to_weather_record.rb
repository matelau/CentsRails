class AddCreatedatToWeatherRecord < ActiveRecord::Migration
  def change
    add_column :weather_records, :created_at, :datetime
  end
end
