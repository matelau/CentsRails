class AddPropertyTaxToColi < ActiveRecord::Migration
  def change
    add_column :colis, :property_tax, :float
  end
end
