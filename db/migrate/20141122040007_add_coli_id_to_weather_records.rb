class AddColiIdToWeatherRecords < ActiveRecord::Migration
  def change
    add_column :weather_records, :coli_id, :integer
    add_index :weather_records, :coli_id
  end
end
