class AddHousingToColi < ActiveRecord::Migration
  def self.up
    Coli.reset_column_information
    add_column :colis, :housing, :float unless Coli.column_names.include?('housing')
  end

  def self.down
    Coli.reset_column_information
    remove_column :colis, :housing, :float if Coli.column_names.include?('housing')
  end
end
