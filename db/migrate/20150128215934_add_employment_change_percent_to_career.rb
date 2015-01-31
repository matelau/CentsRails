class AddEmploymentChangePercentToCareer < ActiveRecord::Migration
  def change
    add_column :careers, :employment_change_percent, :float
  end
end
