class RemoveHousingFromColi < ActiveRecord::Migration
  def change
    remove_column :colis, :housing, :string
  end
end
