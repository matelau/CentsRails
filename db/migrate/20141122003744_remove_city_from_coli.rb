class RemoveCityFromColi < ActiveRecord::Migration
  def change
    remove_column :colis, :city, :string
  end
end
