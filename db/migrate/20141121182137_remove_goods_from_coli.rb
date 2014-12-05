class RemoveGoodsFromColi < ActiveRecord::Migration
  def change
    remove_column :colis, :goods, :float
  end
end
