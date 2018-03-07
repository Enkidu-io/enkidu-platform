class Notification < ApplicationRecord
	belongs_to :user
	belongs_to :notification_type
	validates_presence_of :user_id, :notification_type_id, :notification_description, :bid_id

	def route
		bid = Bid.find(self.bid_id)
		case notification_type_id

		when 1
			dc = DigitalContract.where(bid_id: bid.id).first
			return digital_contract_path(dc)

		when 2
			bid_detail = BidDetail.where(bid_id: bid.id, user_id: self.user_id).first
			return bid_detail_path(bid_detail)

		when 3
			bid_detail = BidDetail.where(bid_id: bid.id, user_id: self.user_id).first
			return bid_detail_path(bid_detail)

		when 4
			bid_detail = BidDetail.where(bid_id: bid.id, user_id: self.user_id).first
			return bid_detail_path(bid_detail)

		end
	end
end
