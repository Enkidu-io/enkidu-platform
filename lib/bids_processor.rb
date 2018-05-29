class BidsProcessor

	def self.params(resolution, params)
		case resolution
		when 1
			return params.require(:bid).permit(:bid_percentage, :project_id, :resolution_id, :vesting_period)
		when 2
			return params.require(:bid).permit(:project_id, :resolution_id)
		when 3
			return params.require(:bid).permit(:bid_percentage, :project_id, :resolution_id)
		when 4
			return params.require(:bid).permit(:project_id, :resolution_id)
		end
	end

	def self.process(resolution, bid, params)
		project = Project.find(bid.project_id)
		bid_perc = bid.bid_percentage.to_f

		case resolution
		
		# Add collaborator
		when 1
			# Requested bid percentage more than available 
			if project.unallocated_percentage < bid_perc
				NotificationProcessor.process_bid_overflow(bid) 
				return false, "Bid could not be created as your demands cannot be met."
			# Added from dashboard
			elsif project.has_employee?(bid.initiater_id)
				# Email not specified
				unless params[:bid][:email].present?
					return false, "Email not found."
				else
					new_user = User.where(email: params[:bid][:email]).first
					# No user with email
					if new_user.nil?
						return false, "User could not be found."
					# Initiator already a member of project
					elsif project.has_employee?(new_user.id) || project.has_made_bid?(new_user.id ,resolution)
						return false, "<b>Invalid request!</b>"
					end
	        		bid.user_id = new_user.id
	        		return true, bid
				end
        	# Bid by new user
      		else
      			new_user = User.find(bid.initiater_id)
      			# Does user exist?
      			if new_user.nil?
      				return false, "User could not be found."
  				# Initiator already a member of project
				elsif project.has_employee?(new_user.id) || project.has_made_bid?(new_user.id ,resolution)
					return false, "<b>Invalid request!</b>"
      			end
        		bid.user_id = new_user.id
        		return true, bid
      		end

		# Remove Collaborator
		when 2
			remove_user = User.where(email: params[:bid][:email]).first
			if remove_user.nil?
				return false, "User could not be found."
			# Initiator not a member of project?
			elsif !project.has_employee?(bid.initiater_id)
				return false, "<b>Insufficient permissions!</b>"
			# New user already member?
			elsif !project.has_employee?(remove_user.id)
				return false, "<b>User is not a member of your project!</b>"
			else
				bid.user_id = remove_user.id
        		return true, bid
			end

		# Dilution
		when 3
			# Initiator not a member of project?
			if project.has_employee?(bid.initiater_id)
				return true, bid
			else
				return false, "<b>Insufficient permissions!</b>"
			end
		when 4
			if project.has_employee?(bid.initiater_id)
				return true, bid
			else
				return false, "<b>Insufficient permissions!</b>"
			end
		end
	end
end