class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.integer :user_id
      t.integer :notification_type_id
      t.datetime :last_clicked

      t.timestamps
    end
  end
end
