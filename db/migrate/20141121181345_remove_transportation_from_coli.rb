class RemoveTransportationFromColi < ActiveRecord::Migration
  def change
    remove_column :colis, :transportation, :string
  end
end
