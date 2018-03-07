class AddActiveStatusToBid < ActiveRecord::Migration[5.1]
  def change
  	add_column :bids, :active, :boolean, default: true
  end
end
