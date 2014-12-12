class AddLaborStatsToColi < ActiveRecord::Migration
  def change
    add_column :colis, :unemp_rate, :float
    add_column :colis, :unemp_trend, :float
    add_column :colis, :income, :float
  end
end
