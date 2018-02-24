class AddDefaultToApprovalPercentage < ActiveRecord::Migration[5.1]
  def change
  	change_column :bid_details, :approval_percentage, :float, default: 0.0
  end
end
