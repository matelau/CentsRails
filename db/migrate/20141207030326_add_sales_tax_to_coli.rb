class AddSalesTaxToColi < ActiveRecord::Migration
  def change
    add_column :colis, :sales_tax, :float
  end
end
