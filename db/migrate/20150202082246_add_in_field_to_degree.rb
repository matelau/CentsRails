class AddInFieldToDegree < ActiveRecord::Migration
  def change
    add_column :degrees, :in_field, :float
  end
end
