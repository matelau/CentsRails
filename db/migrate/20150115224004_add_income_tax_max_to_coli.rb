class AddIncomeTaxMaxToColi < ActiveRecord::Migration
  def change
    add_column :colis, :income_tax_max, :float
  end
end
