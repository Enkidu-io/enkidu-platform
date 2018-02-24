class AddBidIdDigitalContracts < ActiveRecord::Migration[5.1]
  def change
  	add_column :digital_contracts, :bid_id, :integer
  end
end
