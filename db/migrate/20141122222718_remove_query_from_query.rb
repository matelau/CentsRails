class RemoveQueryFromQuery < ActiveRecord::Migration
  def change
    remove_column :queries, :query, :integer
  end
end
