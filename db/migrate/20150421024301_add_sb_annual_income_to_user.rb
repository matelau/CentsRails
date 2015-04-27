class AddSbAnnualIncomeToUser < ActiveRecord::Migration
  def change
    add_column :users, :sb_annual_income, :float
  end
end
