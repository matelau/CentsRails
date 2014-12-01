class AddUpdatedatToColi < ActiveRecord::Migration
  def change
    add_column :colis, :updated_at, :datetime
  end
end
