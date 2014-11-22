class AddLocationToColi < ActiveRecord::Migration
  def change
    add_column :colis, :location, :string
  end
end
