class AddBidIdToNotifications < ActiveRecord::Migration[5.1]
  def change
  	add_reference :notifications, :bid, index: true
  end
end
