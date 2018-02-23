class Project < ApplicationRecord

	has_many :project_users, dependent: :destroy
  	has_many :users, through: :project_users
  	acts_as_taggable_on :tags
  	
  	attr_accessor :leader_allocation
  	after_commit :create_project_leader, on: create

  	validates_presence_of :title, :description, :unallocated_percentage

  	def create_project_leader
  		ProjectUser.create(project_id: self.id, user_id: current_user.id, ownership_percentage: (100 - self.unallocated_percentage))
  	end

end
