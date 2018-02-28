class RemoveUserIdFromBids < ActiveRecord::Migration[5.1]
  def change
  	remove_column :bids, :user_id
  end
end
