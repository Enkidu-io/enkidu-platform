class BidDetailsController < ApplicationController

	before_action :set_bid_detail, only: [:update, :edit]
	before_action :if_user_can_access_bid?, only: [:update, :edit]
	before_action :configure_params, only: [:update]

	def update
		vote = params[:vote_data][:vote]
		puts "The user has selected to vote " + vote
		if vote == "yes"
			@bid_detail.vote = true
		else
			@bid_detail.vote = false
		end
		own_perc = ProjectUser.where(user_id: current_user.id, project_id: @bid_detail.bid.project.id).first.ownership_percentage
		@bid_detail.has_voted = true
		@bid_detail.approval_percentage = @bid_detail.vote == true ? own_perc.to_f : 0.0
		if @bid_detail.save!
			render json: { msg: "Vote success", liked: true }, status: 200
		else
			render json: { msg: "Failed to like.", errors: like.errors }, status: 400
		end
	end

	def edit
		# render json:@bid_detail
	end

	private

		def if_user_can_access_bid?
			if current_user.id != @bid_detail.user_id
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

		def configure_params
			params.require(:vote_data).permit(:vote)
		end
end
