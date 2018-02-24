class DigitalContract < ApplicationRecord

	belongs_to :bid
	belongs_to :project
	after_commit :check_if_two_way, on: :update

	def leader
		User.find(self.project.leader_id)
	end

	def new_employee
		User.find(self.bid.user_id)
	end

	def check_if_two_way
		if self.user_vote && self.leader_vote
			ProjectUser.create(project_id: self.project.id, user_id: self.bid.user_id, ownership_percentage: self.bid.bid_percentage)
			prev_unalloc = self.project.unallocated_percentage
			self.project.update!(unallocated_percentage: prev_unalloc-self.bid.bid_percentage)
		end
	end
end
