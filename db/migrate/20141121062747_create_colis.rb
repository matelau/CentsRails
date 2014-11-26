class CreateColis < ActiveRecord::Migration
  def change
    create_table :colis do |t|
      t.string :city
      t.string :transportation
      t.string :housing
      t.string :food
      t.string :overall
      t.string :state

      t.timestamps
    end
  end
end
