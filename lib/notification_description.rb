class NotificationDescription
	def getDescription(type, to_leader, user_email, project_title, bid_amount)
		if(type == 1)
			if(to_leader == true)
				"A smart contract for user #{user_email} is awaiting your approval."
			else
				"Please confirm you would like to sign this smart contract."
			end
		elsif(type == 2)
			if(to_leader == true)
				"Please confirm user #{user_email} to be added to the list of collaborators for project #{project_title}. The bid placed is #{bid_amount}"
			else
				"Please confirm you'd like to be added to the list of collaborators for project #{project_title}"
			end
		elsif(type == 3)
			if(to_leader == true)
				"Please confirm user #{user_email} to be removed from the list of collaborators for project #{project_title}"
			else
				"Please confirm you'd like to be removed from the list of collaborators for project #{project_title}"
			end
		elsif(type == 4)
			if(to_leader == true)
				"Please confirm your vote for diluting project #{project_title}"
			else
				"Please confirm your vote for diluting project #{project_title}"
			end
		elsif(type == 5)
			if(to_leader == true)
				"Vote for Smart contract for adding #{user_email} to #{project_title} failed"
			else
				"Vote for Smart Contract for adding you to #{project_title} failed"
			end
		end
	end
end