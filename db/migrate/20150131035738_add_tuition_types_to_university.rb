class AddTuitionTypesToUniversity < ActiveRecord::Migration
  def change
    add_column :universities, :tuition_resident, :float
    add_column :universities, :tuition_nonresident, :float
  end
end
