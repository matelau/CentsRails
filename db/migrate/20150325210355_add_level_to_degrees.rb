class AddLevelToDegrees < ActiveRecord::Migration
  def change
    add_column :degrees, :level, :string
  end
end
