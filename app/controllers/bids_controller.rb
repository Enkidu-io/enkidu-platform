class BidsController < ApplicationController
  before_action :set_bid, only: [:show, :edit, :update, :destroy]

  def index
    @bids = current_user.bid_details
  end

  def create
      @bid = Bid.new(bid_params)
      @bid.initiater_id = current_user.id
      status, @bid = BidsProcessor.process(resolution, @bid, params)
      
      # Valid bid
      if status
        if @bid.save!
          flash[:notice] = 'Bid has been successfuly made.'
          redirect_to bids_path
        else
          flash[:notice] = 'Could not create a bid.'
          redirect_to request.referer
        end
      # Invalid bid 
      else
        flash[:alert] = @bid
        redirect_to request.referer
      end
  end

  def update
		if @bid.update(params[:bid_percentage].permit(:user_id, :project_id,:resolution_id))
      flash[:success]="Bid Updated"
			redirect_to root_path
		else
      flash[:success]="Bid Not Updated"
      redirect_to root_path
		end
	end


  def show
  end

  private

    def set_bid
        @bid = Bid.find(params[:id])
    end

    def bid_params
      resolution = params[:bid][:resolution_id]
      BidsProcessor.params(resolution, params)
    end
end
