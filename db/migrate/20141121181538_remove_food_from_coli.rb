class RemoveFoodFromColi < ActiveRecord::Migration
  def change
    remove_column :colis, :food, :string
  end
end
