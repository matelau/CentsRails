class AddGrowthToCareers < ActiveRecord::Migration
  def change
    add_column :careers, :career_growth, :string
    add_column :careers, :career_pct, :string
    add_column :careers, :career_openings, :string
  end
end
