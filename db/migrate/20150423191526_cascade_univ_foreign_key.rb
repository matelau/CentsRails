class CascadeUnivForeignKey < ActiveRecord::Migration
  def change
  	add_foreign_key(:rates_schools, :universities, options: 'ON DELETE CASCADE ON UPDATE CASCADE')
  end
end
