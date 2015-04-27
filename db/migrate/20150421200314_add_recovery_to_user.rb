class AddRecoveryToUser < ActiveRecord::Migration
  def change
    add_column :users, :question, :string
    add_column :users, :answer, :string
  end
end
