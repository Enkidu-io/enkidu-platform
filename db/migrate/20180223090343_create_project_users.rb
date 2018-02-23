class CreateProjectUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :project_users do |t|
      t.integer :project_id
      t.integer :user_id
      t.float :ownership_percentage

      t.timestamps
    end
  end
end
