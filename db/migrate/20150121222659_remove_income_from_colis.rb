class RemoveIncomeFromColis < ActiveRecord::Migration
  def change
    remove_column :colis, :income, :float
  end
end
