class RemoveUnwantedFields < ActiveRecord::Migration[5.1]
  def change
  	remove_column :projects, :float
  end
end
