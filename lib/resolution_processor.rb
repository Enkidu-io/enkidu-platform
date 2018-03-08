class ResolutionProcessor

	def self.process(res_id, bid)
		case res_id
		when 1
			# Add collab
			ProjectUser.create(project_id: bid.project.id, user_id: bid.user_id, ownership_percentage: bid.bid_percentage, vesting_period: bid.variables["vesting_period"])
			prev_unalloc = bid.project.unallocated_percentage
			bid.project.update!(unallocated_percentage: prev_unalloc - bid.bid_percentage)
			user = User.find(bid.user_id)
			name = user.first_name + user.last_name
			Log.create(content: LogDescription.get('new_member', {'full_name': name, 'project_name': bid.project.title}), user_id: bid.user_id, project_id: bid.project.id)
		when 2
			#Remove collab
			project_user = ProjectUser.find_by(project_id: bid.project_id, user_id: bid.user_id)
			project_user.destroy
			prev_unalloc = bid.project.unallocated_percentage
			bid.project.update!(unallocated_percentage: prev_unalloc + bid.bid_percentage)
			Log.create(content: LogDescription.get('remove_member', {'full_name': name, 'project_name': bid.project.title}), user_id: bid.user_id, project_id: bid.project.id)
		when 3
			# Vote dilution
			project_users = ProjectUser.where(project_id: bid.project_id)
			project_users.each do |project_user|
				prev_ownership = project_user.ownership_percentage
				project_user.update(ownership_percentage: prev_ownership - (bid.bid_percentage * prev_ownership / 100)
			end
			prev_unalloc = bid.project.unallocated_percentage
			bid.project.update!(unallocated_percentage: prev_unalloc + bid.bid_percentage)
		end			
	end

end