class AddFieldsToColi < ActiveRecord::Migration
  def change
    add_column :colis, :goods, :string
    add_column :colis, :health_care, :string
    add_column :colis, :utilities, :string
  end
end
