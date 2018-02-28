class ChangeVestingDefaultValue < ActiveRecord::Migration[5.1]
  def change
  	change_column :project_users, :vesting_period, :integer, :default => 12
  end
end
