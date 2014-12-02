class AddUtilitiesToColi < ActiveRecord::Migration
  def change
    add_column :colis, :utilities, :float
  end
end
