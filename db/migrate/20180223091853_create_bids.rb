class CreateBids < ActiveRecord::Migration[5.1]
  def change
    create_table :bids do |t|
      t.integer :user_id
      t.integer :project_id
      t.float :bid_percentage

      t.timestamps
    end
  end
end
