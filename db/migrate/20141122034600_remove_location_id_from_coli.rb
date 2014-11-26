class RemoveLocationIdFromColi < ActiveRecord::Migration
  def change
    remove_column :colis, :location_id, :integer
  end
end
