class LogDescription
	def self.get(type, variables)
		case type

		when 'create_bid'
			"Created a Bid - <b>#{variables[:resolution_name]}</b>"
		when 'voted_bid'
			"<b>#{variables[:resolution_name]}</b> - Casted your vote (<b>#{variables[:vote]}</b>)"
		when 'signed_contract'
			"<b>Signed Digital Contract</b> with <b>#{variables[:full_name]}</b>"
		when 'new_member'
			"<b>#{variables[:full_name]}</b> joined team <b>#{variables[:project_name]}</b>"
		when 'remove_member'
			"<b>#{variables[:full_name]}</b> was removed from team <b>#{variables[:project_name]}</b>"
		end
	end
end