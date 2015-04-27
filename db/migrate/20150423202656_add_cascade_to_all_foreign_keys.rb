class AddCascadeToAllForeignKeys < ActiveRecord::Migration
  def change

  	add_foreign_key(:rates_majors, :users, options: "ON UPDATE CASCADE ON DELETE CASCADE")

  	remove_foreign_key(:rates_majors, :degrees)
  	add_foreign_key(:rates_majors, :degrees, options: "ON UPDATE CASCADE ON DELETE CASCADE")

  	remove_foreign_key(:rates_schools, :users)
  	add_foreign_key(:rates_schools, :users, options: "ON UPDATE CASCADE ON DELETE CASCADE")
  end
end
