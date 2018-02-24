class Bid < ApplicationRecord
  belongs_to :project
  belongs_to :user

  after_commit :create_bid_details, on: create

  def create_bid_details
  	project = self.project
  	project.users.each do |u|
  		BidDetail.create(bid_id: self.id, user_id: u.id)
  	end
  end
end
