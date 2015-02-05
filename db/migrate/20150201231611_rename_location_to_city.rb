class RenameLocationToCity < ActiveRecord::Migration
  def self.up
  	rename_column :colis, :location, :city
  end

  def self.down
  	rename_column :colis, :city, :location
  end
end
