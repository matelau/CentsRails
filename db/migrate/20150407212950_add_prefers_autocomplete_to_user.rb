class AddPrefersAutocompleteToUser < ActiveRecord::Migration
  def change
    add_column :users, :prefers_autocomplete, :boolean
  end
end
