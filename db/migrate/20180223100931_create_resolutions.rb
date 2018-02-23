class CreateResolutions < ActiveRecord::Migration[5.1]
  def change
    create_table :resolutions do |t|
      t.string :name

      t.timestamps
    end
  end
end
