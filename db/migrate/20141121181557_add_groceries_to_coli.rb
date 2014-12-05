class AddGroceriesToColi < ActiveRecord::Migration
  def change
    add_column :colis, :groceries, :float
  end
end
