class RemoveUnemprateFromColi < ActiveRecord::Migration
  def change
    remove_column :colis, :unemprate, :float
  end
end
