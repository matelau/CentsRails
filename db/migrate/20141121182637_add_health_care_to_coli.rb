class AddHealthCareToColi < ActiveRecord::Migration
  def change
    add_column :colis, :health_care, :float
  end
end
