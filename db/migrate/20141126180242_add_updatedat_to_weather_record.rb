class AddUpdatedatToWeatherRecord < ActiveRecord::Migration
  def change
    add_column :weather_records, :updated_at, :datetime
  end
end
