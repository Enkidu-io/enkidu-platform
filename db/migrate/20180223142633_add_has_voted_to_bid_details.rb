class AddHasVotedToBidDetails < ActiveRecord::Migration[5.1]
  def change
    add_column :bid_details, :has_voted, :boolean ,:default => false

  end
end
