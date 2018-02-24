class ChangeColumnsInDigitalContracts < ActiveRecord::Migration[5.1]
  def change
  	rename_column :digital_contracts, :leader_vote, :leader_signed
  	rename_column :digital_contracts, :user_vote, :user_signed
  end
end
