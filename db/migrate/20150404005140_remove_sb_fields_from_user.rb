class RemoveSbFieldsFromUser < ActiveRecord::Migration
  def change
    remove_column :users, :debt, :float
    remove_column :users, :savings, :float
    remove_column :users, :books, :float
  end
end
