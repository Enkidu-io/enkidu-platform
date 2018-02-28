class AddVariablesToBids < ActiveRecord::Migration[5.1]
  def change
  	add_column :bids, :variables, :jsonb, default: {}, null: false
  end
end
