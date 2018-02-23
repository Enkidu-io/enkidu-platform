class DropTableModelsFromSchema < ActiveRecord::Migration[5.1]
  def change
  	drop_table :models if self.table_exists?("models")
  end
end
