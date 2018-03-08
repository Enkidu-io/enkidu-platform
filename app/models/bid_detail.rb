class BidDetail < ApplicationRecord
	belongs_to :bid
	belongs_to :user
	after_commit :send_approval_notification, :on => :create
	after_commit :create_log, :on => [:update]
	after_commit :once_voting_done, :on => [:update]
	
	validates_presence_of :bid_id, :user_id, :approval_percentage
	validates :approval_percentage, numericality: { only_float: true, greater_than_or_equal_to: 0.0, less_than_or_equal_to: 100.0 }
	validates :user_id, :uniqueness => { :scope => :bid_id }

	attr_accessor :vote

	def create_log
		vote = (self.has_voted == true && self.approval_percentage > 0.0) ? 'Yes' : 'No'
		Log.create(content: LogDescription.get('voted_bid', {'resolution_name': self.bid.resolution.name, 'vote': vote }), user_id: self.user_id, project_id: self.bid.project_id)
	end

	def send_approval_notification
		NotificationProcessor.process_resolution(self)
	end

	def once_voting_done
		bid_details = self.bid.bid_details
		approval_weight, total_votes_cast = vote_calc(bid_details)

		# All votes casted?
		if total_votes_cast == bid_details.count
			# Majority vote?
			self.bid.update!(active: false)
			STDOUT.puts "APPROVAL WEIGHT:"+approval_weight.to_s
			if approval_weight > 50.0
				case self.bid.resolution_id
				when 1
					DigitalContract.create!(bid_id: self.bid.id, project_id: self.bid.project.id, user_signed: false, leader_signed: false)
					NotificationProcessor.process_digital_contract(self, 1)
				when 2
					ResolutionProcessor.process(self.bid.resolution_id, self.bid)
				when 3
					ResolutionProcessor.process(self.bid.resolution_id, self.bid)
				end
			else
				# NotificationProcessor.process_digital_contract(self, 5)
			end
		end
	end

	private

		def vote_calc(bid_details)
			approval_weight = 0.0
			total_votes_cast = 0

			bid_details.each do |bid_detail|
				if(bid_detail.has_voted == true)
					total_votes_cast += 1
					approval_weight += bid_detail.approval_percentage
				else
					break
				end
			end
			return approval_weight, total_votes_cast
		end
end
