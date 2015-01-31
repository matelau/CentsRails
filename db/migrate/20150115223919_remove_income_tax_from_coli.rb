class RemoveIncomeTaxFromColi < ActiveRecord::Migration
  def change
    remove_column :colis, :income_tax, :float
  end
end
