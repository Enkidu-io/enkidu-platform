class LogDescription
	def self.get(type, variables)

		case type

		when 'create_bid'
			"Created a Bid - #{variables[:resolution_name]}"
		when 'voted_bid'
			"#{variables[:resolution_name]} - Casted your vote (<b>#{variables[:vote]}</b>)"
		when 'signed_contract'
			"Signed Digital Contract with #{variables[:full_name]}"
		when 'new_member'
			"Joined team #{variables[:project_name]}"
		when 'remove_member'
			"Removed from team #{variables[:project_name]}"
		end
	end
end