class CreateNotificationTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :notification_types do |t|
      t.text :notification_content

      t.timestamps
    end
  end
end
