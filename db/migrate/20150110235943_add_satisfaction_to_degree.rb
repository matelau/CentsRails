class AddSatisfactionToDegree < ActiveRecord::Migration
  def change
    add_column :degrees, :satisfaction, :float
  end
end
