class AddMeaningfulToDegrees < ActiveRecord::Migration
  def change
    add_column :degrees, :meaningful, :float
  end
end
