class AddResolutionIdToBidRequests < ActiveRecord::Migration[5.1]
  def change
  	add_column :bids, :resolution_id, :integer
  end
end
