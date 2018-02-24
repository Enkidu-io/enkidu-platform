class AddFieldsToUsers < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :first_name, :string
  	add_column :users, :last_name, :string
  	add_column :users, :linkedin_profile, :string
  	add_column :users, :job_profile, :string
  	add_column :users, :age, :integer
  	add_column :users, :dob, :date
  end
end
