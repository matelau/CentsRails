class AddMonthToWeatherRecord < ActiveRecord::Migration
  def self.up
    WeatherRecord.reset_column_information
    add_column :weather_records, :month, :string unless WeatherRecord.column_names.include?('month')
  end

  def self.down
    WeatherRecord.reset_column_information
    remove_column :weather_records, :month, :string if WeatherRecord.column_names.include?('month')
  end
end
