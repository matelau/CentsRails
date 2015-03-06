class AddCategoryToAmount < ActiveRecord::Migration
  def change
    add_column :amounts, :category, :string
  end
end
