class ChangeGrad4ToGrad6 < ActiveRecord::Migration
  def change
  	rename_column :universities, :grad_rate_4_year, :grad_rate_6_year
  end
end
