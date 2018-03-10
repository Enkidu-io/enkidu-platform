class AddImgUrlToProject < ActiveRecord::Migration[5.1]
  def change
  	unless column_exists? :projects, :img_url
	  add_column :projects, :img_url, :string
	end
  end
end
