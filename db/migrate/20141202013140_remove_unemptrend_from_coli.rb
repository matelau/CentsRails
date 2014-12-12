class RemoveUnemptrendFromColi < ActiveRecord::Migration
  def change
    remove_column :colis, :unemptrend, :float
  end
end
