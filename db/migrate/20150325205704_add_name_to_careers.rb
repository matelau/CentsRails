class AddNameToCareers < ActiveRecord::Migration
  def change
    add_column :careers, :name, :string
    add_column :careers, :salary, :string
  end
end
