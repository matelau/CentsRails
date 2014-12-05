class AddGoodsToColi < ActiveRecord::Migration
  def change
    add_column :colis, :goods, :float
  end
end
