class AddJobOpeningsToCareer < ActiveRecord::Migration
  def change
    add_column :careers, :job_openings, :integer
  end
end
