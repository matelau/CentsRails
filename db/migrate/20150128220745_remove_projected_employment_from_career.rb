class RemoveProjectedEmploymentFromCareer < ActiveRecord::Migration
  def change
    remove_column :careers, :projected_employment, :float
  end
end
