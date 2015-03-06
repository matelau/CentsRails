class RemoveColumnsFromAmount < ActiveRecord::Migration
  def change
    remove_column :amounts, :misc, :float
    remove_column :amounts, :housing, :float
    remove_column :amounts, :books, :float
    remove_column :amounts, :insurance, :float
    remove_column :amounts, :utilities, :float
    remove_column :amounts, :type, :string
    remove_column :amounts, :food, :float
    remove_column :amounts, :savings, :float
    remove_column :amounts, :loans, :float
    remove_column :amounts, :tuition, :float
    remove_column :amounts, :healthcare, :float
    remove_column :amounts, :debt, :float
    remove_column :amounts, :transportation, :float
  end
end
