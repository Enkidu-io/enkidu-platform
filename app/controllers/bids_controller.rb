class BidsController < ApplicationController

  def index
    @bids=current_user.bids
  end

  def new
    @bids=Bid.new
  end

  def create
      @bid = Bid.new(bid_params)
      @bid.save

      if @bid.save
       flash[:notice] = 'done'
     else
       flash[:notice] = 'failed'
     end

  end

  def show
  end

  private

  def bid_params
    params.require(:bid).permit(:bid_percentage).merge(user_id: current_user.id ,project_id: project_id,resolution_id: resolution_id)
  end



end
