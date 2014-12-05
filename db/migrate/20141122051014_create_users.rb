class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.float :debt
      t.float :books
      t.float :savings
      t.string :email
      t.string :password

      t.timestamps
    end
  end
end
