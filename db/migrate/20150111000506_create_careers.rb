class CreateCareers < ActiveRecord::Migration
  def change
    create_table :careers do |t|
      t.float :projected_employment

      t.timestamps
    end
  end
end
