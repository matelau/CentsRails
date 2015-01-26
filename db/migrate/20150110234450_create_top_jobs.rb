class CreateTopJobs < ActiveRecord::Migration
  def change
    create_table :top_jobs do |t|
      t.string :name
      t.float :salary

      t.timestamps
    end
  end
end
