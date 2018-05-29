class AddStatusToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :complete, :boolean, default: false
  end
end
