class AddViewCountToProjects < ActiveRecord::Migration[5.1]
  def change
  	add_column :projects, :view_count, :integer, default:0
  end
end
