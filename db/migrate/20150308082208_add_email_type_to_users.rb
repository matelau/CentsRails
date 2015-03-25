class AddEmailTypeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :email_type, :string
  end
end
