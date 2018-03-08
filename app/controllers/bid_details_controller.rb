class BidDetailsController < ApplicationController

	before_action :set_bid_detail, only: [:update, :edit]
	before_action :if_user_can_access_bid?, only: [:update, :edit]
	before_action :configure_params, only: [:update]

	def update
		vote = params[:vote_data][:vote]
		if vote == "no"
			@bid_detail.approval_percentage = 0.0
		end
		
		@bid_detail.has_voted = true
		if @bid_detail.save!
			flash[:notice] = "You've successfully voted yes."
			render json: { msg: "Vote success", liked: true }, status: 200
		else
			flash[:alert] = "A vote for that bid could not take place."
			render json: { msg: "Failed to vote.", errors: @bid_detail.errors }, status: 400
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
