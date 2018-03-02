class RemoveBidPercentageFromBids < ActiveRecord::Migration[5.1]
  def change
  	remove_column :bids, :bid_percentage
  end
end