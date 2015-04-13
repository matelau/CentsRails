class AddCareerCodeToCareers < ActiveRecord::Migration
  def change
    add_column :careers, :career_code, :string
  end
end
