class DropToBeValidatedUsers < ActiveRecord::Migration
  def change
  	drop_table :to_be_validated_users
  end
end
