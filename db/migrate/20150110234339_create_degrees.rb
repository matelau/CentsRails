class CreateDegrees < ActiveRecord::Migration
  def change
    create_table :degrees do |t|
      t.float :salary
      t.float :unemployment
      t.boolean :in_field
      t.string :name

      t.timestamps
    end
  end
end
