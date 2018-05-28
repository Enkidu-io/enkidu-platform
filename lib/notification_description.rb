class NotificationDescription
	def self.getDescription(type, to_member, variables)
		if(type == 1)
			#Smart Contract
			if(to_member == true)
				"A smart contract for user #{variables[:full_name]} is awaiting your approval."
			else
				"Please confirm you would like to sign this smart contract."
			end
		elsif(type == 2)
			#Add collaborator
			if(to_member == true)
				"Please confirm user #{variables[:full_name]} to be added to the list of collaborators for project #{variables[:title]}."
			else
				"Please confirm you'd like to be added to the list of collaborators for project #{variables[:title]}."
			end
		elsif(type == 3)
			#Remove collaborator
			if(to_member == true)
				"Please confirm your vote for removal of user #{variables[:full_name]} to be removed from the list of collaborators for project #{variables[:title]}."
			else
				"Please confirm you'd like to be removed from the list of collaborators for project #{variables[:title]}."
			end
		elsif(type == 4)
			#Vote Dilution
			if(to_member == true)
				"Please confirm your vote for diluting project #{variables[:title]}."
			else
				"Please confirm your vote for diluting project #{variables[:title]}."
			end
		elsif(type == 5)
			#Smart contract fail
			if(to_member == true)
				"Vote for Smart contract for adding #{variables[:full_name]} to #{variables[:title]} failed."
			else
				"Vote for Smart Contract for adding you to #{variables[:title]} failed."
			end
		elsif(type == 6)
			#User bidding more than the unallocated percentage
			if(to_member == true)
				"#{variables[:full_name]} tried to bid in your team for #{variables[:perc]}%"
			end
		end
	end
end