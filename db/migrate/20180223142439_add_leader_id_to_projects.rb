class AddLeaderIdToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :leader_id, :integer

  end
end
