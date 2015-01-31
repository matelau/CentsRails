class AddEmploymentChangeVolumeToCareer < ActiveRecord::Migration
  def change
    add_column :careers, :employment_change_volume, :integer
  end
end
