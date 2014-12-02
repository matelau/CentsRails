class CreateScalars < ActiveRecord::Migration
  def change
    create_table :scalars do |t|
      t.belongs_to :user
      t.float :misc
      t.float :housing
      t.float :books
      t.float :insurance
      t.float :utilities
      t.string :type
      t.string :name
      t.float :food
      t.float :savings
      t.float :loans
      t.float :tuition
      t.float :healthcare
      t.float :debt
      t.float :transportation
      t.boolean :public
      t.integer :user_id

      t.timestamps
    end
  end
end
