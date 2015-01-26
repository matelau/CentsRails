class RemoveNetCostFromUniversity < ActiveRecord::Migration
  def change
    remove_column :universities, :netCost, :float
  end
end
