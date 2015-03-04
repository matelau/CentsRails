class RenameScalarToAmount < ActiveRecord::Migration
  def change
  	rename_table :scalars, :amounts
  end
end
