class CreateCompleteds < ActiveRecord::Migration
  def change
    create_table :completeds do |t|
      t.belongs_to :user
      t.string :section
      t.integer :user_id

      t.timestamps
    end
  end
end
