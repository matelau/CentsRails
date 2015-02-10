class AddEconomicGrowthToColi < ActiveRecord::Migration
  def change
    add_column :colis, :economic_growth, :float
  end
end
