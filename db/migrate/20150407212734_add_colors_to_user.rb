class AddColorsToUser < ActiveRecord::Migration
  def change
    add_column :users, :primary_color, :string
    add_column :users, :secondary_color, :string
  end
end
