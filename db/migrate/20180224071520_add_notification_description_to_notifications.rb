class AddNotificationDescriptionToNotifications < ActiveRecord::Migration[5.1]
  def change
    add_column :notifications, :notification_description, :text
  end
end
