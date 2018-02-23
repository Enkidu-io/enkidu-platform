class CreateDigitalContracts < ActiveRecord::Migration[5.1]
  def change
    create_table :digital_contracts do |t|
      t.text :eth_address
      t.integer :project_id
      t.boolean :leader_vote, :default => nil
      t.boolean :user_vote, :default => nil

      t.timestamps
    end
  end
end
