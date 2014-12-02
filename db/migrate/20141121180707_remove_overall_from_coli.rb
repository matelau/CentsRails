class RemoveOverallFromColi < ActiveRecord::Migration
  def change
    remove_column :colis, :overall, :string
  end
end
