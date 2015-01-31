class CreateOffers < ActiveRecord::Migration
  def change
  	if not table_exists? :offers
    	create_table :offers do |t|
    		t.integer :university_id
      	t.integer :degree_id

      	t.timestamps
    	end
    	add_index :offers, :university_id
    	add_index :offers, :degree_id
    	add_index :offers, [:university_id, :degree_id], unique: true
  	end
  end
end
