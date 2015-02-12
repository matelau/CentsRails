class AddRecommendToDegrees < ActiveRecord::Migration
  def change
    add_column :degrees, :recommend, :float
  end
end
