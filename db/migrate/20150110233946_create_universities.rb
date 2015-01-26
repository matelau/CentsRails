class CreateUniversities < ActiveRecord::Migration
  def change
    create_table :universities do |t|
      t.integer :size
      t.integer :rank
      t.float :housing
      t.string :state
      t.string :name
      t.float :tuition
      t.float :netCost
      t.float :grad_rate_4_year

      t.timestamps
    end
  end
end
