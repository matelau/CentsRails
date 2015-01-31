class RemoveTuitionFromUniversity < ActiveRecord::Migration
  def change
    remove_column :universities, :tuition, :float
  end
end
