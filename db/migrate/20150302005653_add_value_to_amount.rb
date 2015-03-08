class AddValueToAmount < ActiveRecord::Migration
  def change
    add_column :amounts, :value, :float
  end
end
