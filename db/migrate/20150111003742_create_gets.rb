class CreateGets < ActiveRecord::Migration
  def change
    create_table :gets do |t|
      t.integer :career_id
      t.integer :degree_id

      t.timestamps
    end
    add_index :gets, :degree_id
    add_index :gets, :career_id
    add_index :gets, [:career_id, :degree_id], unique: true
  end
end
