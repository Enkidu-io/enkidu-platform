class Project < ApplicationRecord

	has_many :project_users, dependent: :destroy
	has_many :users, through: :project_users
	has_many :bids, dependent: :destroy
	has_many :digital_contracts, dependent: :destroy
	has_many :payment_gateways, dependent: :destroy
	acts_as_taggable_on :tags
	
	attr_accessor :leader_allocation
	after_commit :create_project_leader, on: :create

	validates_presence_of :title, :description, :unallocated_percentage

	def is_an_employee?(user_id)
		self.users.pluck[:id].include?(user_id)
	end

	def create_project_leader
		ProjectUser.create(project_id: self.id, user_id: self.leader_id, ownership_percentage: (100 - self.unallocated_percentage))
	end

end
