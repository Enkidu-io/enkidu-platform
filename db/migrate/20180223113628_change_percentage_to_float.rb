class ChangePercentageToFloat < ActiveRecord::Migration[5.1]
  def change
  	remove_column :projects, :unallocated_percentage
  	add_column :projects, :unallocated_percentage, :float
  end
end
