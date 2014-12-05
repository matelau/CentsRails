class AddCostOfLivingToColi < ActiveRecord::Migration
  def change
    add_column :colis, :cost_of_living, :float
  end
end
