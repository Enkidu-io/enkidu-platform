class AddLastNotifiedAtToUsers < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :last_notified_at, :datetime
  end
end
