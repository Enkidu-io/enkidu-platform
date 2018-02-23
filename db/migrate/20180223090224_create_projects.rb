class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.text :title
      t.text :description
      t.integer :ip_ownership_id
      t.string :unallocated_percentage
      t.string :float

      t.timestamps
    end
  end
end
