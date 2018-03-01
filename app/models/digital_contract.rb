class DigitalContract < ApplicationRecord

	belongs_to :bid
	belongs_to :project
	after_commit :check_if_two_way, on: :update

	validates_presence_of :project_id, :bid_id, :user_signed, :leader_signed
	validates_presence_of :eth_address, if: proc { user_signed == true }
	validates :project_id, :uniqueness => { :scope => :bid_id }

	def leader
		User.find(self.project.leader_id)
	end

	def new_employee
		User.find(self.bid.user_id)
	end

	def check_if_two_way
		if self.user_signed && self.leader_signed
			ResolutionProcessor.process(self.bid.resolution_id, self.bid)
		end
	end
end