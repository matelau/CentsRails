class AddTransportationToColi < ActiveRecord::Migration
  def change
    add_column :colis, :transportation, :float
  end
end
