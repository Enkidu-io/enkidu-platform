class BidDetailsController < ApplicationController

	before_action :set_bid_detail, only: [:update]
	before_action :if_user_can_access_bid, only: [:update]

	def update
		own_perc = ProjectUser.where(user_id: current_user.id, project_id: @bid_detail.bid.project.id).first.ownership_percentage
		@bid_detail.has_voted = true
		@bid_detail.approval_percentage = @bid_detail.vote == true ? own_perc.to_f : 0.0
		if @bid_detail.save!
			flash[:notice] = "Your vote has been casted."
			redirect_to root_path
		else
			flash[:alert] = "Vote could not be saved."
			redirect_to request.referer
		end
	end

	private

		def if_user_can_access_bid
			unless current_user.id == @bid_detail.user_id
				flash[:notice] = "You do not have enough permissions."
				redirect_to request.referer
			elsif @bid_detail.has_voted
				flash[:notice] = "You have already casted your vote for this particular bid."
				redirect_to request.referer
			end
		end

		def set_bid_detail
			@bid_detail = BidDetail.find(params[:id])
		end

end
