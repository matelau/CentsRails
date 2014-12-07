class AddIncomeTaxToColi < ActiveRecord::Migration
  def change
    add_column :colis, :income_tax, :float
  end
end
