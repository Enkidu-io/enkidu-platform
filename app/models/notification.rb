class Notification < ApplicationRecord
	include Rails.application.routes.url_helpers
	
	belongs_to :user
	belongs_to :notification_type

	validates_presence_of :user_id, :notification_type_id, :notification_description, :bid_id


	def group_by_criteria
  		created_at.to_date.to_s(:db)
  	end
  	
	def route
		bid = Bid.find(self.bid_id)
		case self.notification_type_id

		when 1
			dc = DigitalContract.where(bid_id: bid.id).first
			return edit_digital_contract_path(dc)

		when 2
			bid_detail = BidDetail.where(bid_id: bid.id, user_id: self.user_id).first
			return edit_bid_detail_path(bid_detail)

		when 3
			bid_detail = BidDetail.where(bid_id: bid.id, user_id: self.user_id).first
			return edit_bid_detail_path(bid_detail)

		when 4
			bid_detail = BidDetail.where(bid_id: bid.id, user_id: self.user_id).first
			return edit_bid_detail_path(bid_detail)

		end
	end

end
