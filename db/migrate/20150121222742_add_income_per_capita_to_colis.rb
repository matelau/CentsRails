class AddIncomePerCapitaToColis < ActiveRecord::Migration
  def change
    add_column :colis, :income_per_capita, :float
  end
end
