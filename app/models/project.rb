class Project < ApplicationRecord

	has_many :project_users, dependent: :destroy
	has_many :users, through: :project_users
	has_many :bids, dependent: :destroy
	has_many :digital_contracts, dependent: :destroy
	has_many :payment_gateways, dependent: :destroy
	has_many :comments, dependent: :destroy
	has_many :likes, dependent: :destroy
	has_many :comments, dependent: :destroy
	has_many :views, dependent: :destroy
	has_many :ratings, dependent: :destroy
	has_many :logs, dependent: :destroy
	acts_as_taggable_on :tags
	
	attr_accessor :tags
	attr_accessor :leader_allocation
	after_commit :create_project_leader, on: :create
	before_validation :check_percentages, on: :create

	validates_presence_of :title, :description, :unallocated_percentage, :treasury_percentage
	validates_uniqueness_of :title

	def has_employee?(user_id)
		self.users.pluck(:id).include?(user_id)
	end

	def has_made_bid?(user_id, res_id)
		self.bids.where(resolution_id: res_id).where("variables ->> 'user_id' = ?", user_id.to_s).where(active: true).first ? true : false
	end

	def create_project_leader
		ProjectUser.create!(project_id: self.id, user_id: self.leader_id, ownership_percentage: (100 - (self.unallocated_percentage + self.treasury_percentage)) )
	end

	def check_percentages
		if self.treasury_percentage.to_f + self.leader_allocation.to_f >= 100.0
			errors.add(:treasury_percentage, "Your percentages should add up to a maximum of 100.")
		end
	end

end