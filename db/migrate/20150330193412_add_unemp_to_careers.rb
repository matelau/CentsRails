class AddUnempToCareers < ActiveRecord::Migration
  def change
  	add_column :careers, :unemp11, :float
  	add_column :careers, :unemp12, :float
  end
end
