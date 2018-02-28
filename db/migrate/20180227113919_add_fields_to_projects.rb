class AddFieldsToProjects < ActiveRecord::Migration[5.1]
  def change
  	add_column :projects, :treasury_percentage, :float
  	add_column :projects, :project_intro, :text
  end
end
