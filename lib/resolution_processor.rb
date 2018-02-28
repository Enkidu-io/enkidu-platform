class ResolutionProcessor

	def process(res_id, bid)
		case res_id
		when 1
			# Add collab
			ProjectUser.create(project_id: bid.project.id, user_id: bid.user_id, ownership_percentage: bid.bid_percentage)
			prev_unalloc = bid.project.unallocated_percentage
			bid.project.update!(unallocated_percentage: prev_unalloc - bid.bid_percentage)
		when 2
			# Remove collab

		when 3
			# Vote dilution
			
		end			
	end

end