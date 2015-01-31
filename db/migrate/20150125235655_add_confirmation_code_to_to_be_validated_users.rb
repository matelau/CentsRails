class AddConfirmationCodeToToBeValidatedUsers < ActiveRecord::Migration
  def change
    add_column :to_be_validated_users, :confirmation_code, :string
  end
end
