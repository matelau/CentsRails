class RemoveStateFromColi < ActiveRecord::Migration
  def change
    remove_column :colis, :state, :string
  end
end
