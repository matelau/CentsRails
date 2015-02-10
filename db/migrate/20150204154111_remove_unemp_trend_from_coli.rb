class RemoveUnempTrendFromColi < ActiveRecord::Migration
  def change
    remove_column :colis, :unemp_trend, :float
  end
end
