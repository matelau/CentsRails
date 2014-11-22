class AddLocationToColi < ActiveRecord::Migration
  def change
    add_reference :colis, :location, index: true
  end
end
