class AddStateToColi < ActiveRecord::Migration
  def change
    add_column :colis, :state, :string
  end
end
