class AddVestingPeriodForProjectsUsers < ActiveRecord::Migration[5.1]
  def change
  	# Vesting period in months
  	add_column :project_users, :vesting_period, :integer
  end
end
