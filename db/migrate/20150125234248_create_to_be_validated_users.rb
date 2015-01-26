class CreateToBeValidatedUsers < ActiveRecord::Migration
  def change
    create_table :to_be_validated_users do |t|
      t.string :first_name
      t.string :last_name
      t.string :password_digest
      t.string :email

      t.timestamps
    end
  end
end
