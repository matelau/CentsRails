class AddDegreeIdToTopJobs < ActiveRecord::Migration
  def change
    add_column :top_jobs, :degree_id, :integer
  end
end
