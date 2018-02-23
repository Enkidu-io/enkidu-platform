class AddInitiaterIdToBids < ActiveRecord::Migration[5.1]
  def change
    add_column :bids, :initiater_id, :integer
  end
end
