class RemoveHealthCareFromColi < ActiveRecord::Migration
  def change
    remove_column :colis, :health_care, :string
  end
end
