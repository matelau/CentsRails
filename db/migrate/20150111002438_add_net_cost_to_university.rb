class AddNetCostToUniversity < ActiveRecord::Migration
  def change
    add_column :universities, :net_cost, :float
  end
end
