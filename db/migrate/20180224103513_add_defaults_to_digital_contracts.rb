class AddDefaultsToDigitalContracts < ActiveRecord::Migration[5.1]
  def change
  	change_column :digital_contracts, :leader_signed, :boolean, default: false
  	change_column :digital_contracts, :user_signed, :boolean, default: false
  end
end
