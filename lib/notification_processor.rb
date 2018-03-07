class NotificationProcessor

	def self.process_resolution(bid_detail)
		bid = bid_detail.bid
		project = bid.project
		resolution = bid.resolution_id

		case resolution
		when 1
			variables = { full_name: User.find(bid.user_id).full_name, title: project.title, bid_percentage: bid.bid_percentage}
			description = NotificationDescription.getDescription(
				2, true , variables)
			
			Notification.create(user_id: bid_detail.user_id, notification_type_id: 2,
				notification_description: description, bid_id: bid.id)

		when 2
			variables = { full_name: User.find(bid.user_id ).full_name, title: project.title }
			description = NotificationDescription.getDescription(
				3, true, variables)
			
			Notification.create(user_id: bid_detail.user_id, notification_type_id: 3,
					notification_description: description, bid_id: bid.id)
		
		when 3
			variables = { full_name: User.find(bid.initiater_id ).full_name, title: project.title }
			description = NotificationDescription.getDescription(
				4, true, variables)
			
			Notification.create(user_id: bid_detail.user_id, notification_type_id: 4,
				   notification_description: description, bid_id: bid.id)
		end
	end

	def self.process_digital_contract(bid_detail, accepted)
		bid = bid_detail.bid
		project_leader_id = bid.project.leader_id
		variables = { full_name: User.find(bid.user_id).full_name, title: bid.project.title }
		
		# Notify Leader
		description = NotificationDescription.getDescription(accepted, true, variables)
		Notification.create(user_id: project_leader_id, notification_type_id: 1,
		   	notification_description: description, bid_id: bid.id)
		
		# Notify new employee
		description =  NotificationDescription.getDescription(accepted, false, variables)
		Notification.create(user_id: bid.user_id, notification_type_id: 1,
		    notification_description: description, bid_id: bid.id)
	end
end