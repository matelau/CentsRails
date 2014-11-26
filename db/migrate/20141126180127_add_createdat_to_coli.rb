class AddCreatedatToColi < ActiveRecord::Migration
  def change
    add_column :colis, :created_at, :datetime
  end
end
