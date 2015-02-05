class RemoveInFieldFromDegree < ActiveRecord::Migration
  def change
    remove_column :degrees, :in_field, :boolean
  end
end
