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
			"#{variables[:full_name]} joined team #{variables[:project_name]}"
		when 'remove_member'
			"#{variables[:full_name]} was removed from team #{variables[:project_name]}"
		end
	end
end