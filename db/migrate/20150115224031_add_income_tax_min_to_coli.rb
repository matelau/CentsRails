class AddIncomeTaxMinToColi < ActiveRecord::Migration
  def change
    add_column :colis, :income_tax_min, :float
  end
end
