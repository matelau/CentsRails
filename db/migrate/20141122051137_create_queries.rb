class CreateQueries < ActiveRecord::Migration
  def change
    create_table :queries do |t|
      t.belongs_to :user
      t.string :url
      t.integer :query

      t.timestamps
    end
  end
end
