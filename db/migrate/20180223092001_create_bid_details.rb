class CreateBidDetails < ActiveRecord::Migration[5.1]
  def change
    create_table :bid_details do |t|
      t.integer :bid_id
      t.integer :user_id
      t.float :approval_percentage

      t.timestamps
    end
  end
end
