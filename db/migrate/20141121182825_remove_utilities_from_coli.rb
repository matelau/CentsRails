class RemoveUtilitiesFromColi < ActiveRecord::Migration
  def change
    remove_column :colis, :utilities, :string
  end
end
