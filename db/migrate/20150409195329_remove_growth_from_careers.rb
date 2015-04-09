class RemoveGrowthFromCareers < ActiveRecord::Migration
  def change
    remove_column :careers, :career_growth, :string
    remove_column :careers, :career_pct, :string
    remove_column :careers, :career_openings, :string
  end
end
