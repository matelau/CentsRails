class DestroyOauth < ActiveRecord::Migration
  def change
  	drop_table :oauth_access_grants
  end
end
