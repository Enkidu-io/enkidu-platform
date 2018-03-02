class BidDetail < ApplicationRecord
	belongs_to :bid
	belongs_to :user
	after_commit :send_approval_notifications, :on => :create
	after_commit :create_digital_contract, :on => [:update] 
	require 'notification_description'
	
	validates_presence_of :bid_id, :user_id, :approval_percentage
	validates :approval_percentage, numericality: { only_float: true, greater_than: 0.0, less_than: 100.0 }
	validates :user_id, :uniqueness => { :scope => :bid_id }

	def send_approval_notifications
		notificationDescription = NotificationDescription.new
		project_title = self.bid.project.title
		resolution = self.bid.resolution_id
		if resolution == 1
			if(self.bid.user_id.present?)
				#Added collaborator via dashboard
				notification_description_for_members = notificationDescription.getDescription(2, 
			   																	true,
			   																	User.find(self.bid.user_id).email, 
			   																	project_title,
			   																	self.bid.bid_percentage)
				notification_member = Notification.new(user_id: self.user_id, 
												   notification_type_id: 2,
												   notification_description: notification_description_for_members)

			 	notification_member.save
			else
				#Person applied for the bid via index
				notification_description_for_members = notificationDescription.getDescription(2,
																							true,
																							User.find(self.bid.initiater_id).email,
																							project_title,
																							self.bid.bid_percentage)
				notification_member = Notification.new(user_id: self.user_id, 
													   notification_type_id: 2,
													   notification_description: notification_description_for_members)

				notification_member.save
			end
		elsif resolution == 2
			notification_description_for_members = notificationDescription.getDescription(3, 
			   																	true,
			   																	User.find(self.bid.initiater_id ).email, 
			   																	project_title,
			   																	0)
			notification_member = Notification.new(user_id: self.user_id, 
													   notification_type_id: 3,
													   notification_description: notification_description_for_members)
			notification_member.save
		elsif resolution == 3
			notification_description_for_members = notificationDescription.getDescription(4, 
			   																	true,
			   																	User.find(self.bid.initiater_id ).email, 
			   																	project_title,
			   																	0)
			notification_member = Notification.new(user_id: self.user_id, 
													   notification_type_id: 4,
													   notification_description: notification_description_for_members)
		
			notification_member.save
		end
	end
	def create_digital_contract
		total_votes_cast = 0
		approval_weight = 0.0

		bid_details = self.bid.bid_details

		bid_details.each do |bid_detail|
			if(bid_detail.has_voted == true)
				total_votes_cast += 1
				approval_weight += bid_detail.approval_percentage
			else
				break
			end
		end

		project_title = self.bid.project.title
		if(total_votes_cast == bid_details.count && approval_weight > 50.0)
			project_leader_id = self.bid.project.leader_id
			notification_leader = Notification.new(user_id: project_leader_id, 
												   notification_type_id: 1,
												   notification_description: getDescription(1, true, self.bid.user.email, project_title))
			notification_leader.save
			notification_user = Notification.new(user_id: self.bid.user_id, 
												   notification_type_id: 1,
												   notification_description: getDescription(1, false, self.bid.user.email, project_title))
			notification_user.save
			DigitalContract.new(bid_id: self.bid.bid_id, project_id: self.bid.project.id)
			DigitalContract.save
		end
		if(total_votes_cast == bid_details.count && approval_weight <= 50.0)
			notification_leader = Notification.new(user_id: project_leader_id,
												   notification_type_id: 1,
												   notification_description: getDescription(5, true, self.bid.user.email,project_title))
			notification_leader.save
			notification_user = Notification.new(user_id: self.bid.user_id, 
												   notification_type_id: 1,
												   notification_description: getDescription(5, false, self.bid.user.email ,project_title))
			notification_user.save
		end
	end
end
