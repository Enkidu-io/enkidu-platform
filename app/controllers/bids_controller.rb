class BidsController < ApplicationController
  before_action :set_bid, only: [:show, :edit, :update, :destroy]

  def index
    @bids = current_user.bids
  end

  def new
    @bid = Bid.new
  end

  # add new collaborator to be added by email (check for add collab 2 ways)
  def create
      @bid = Bid.new(bid_params)
      if @bid.save
       flash[:notice] = 'Bid has been successfuly made.'
       redirect_to bids_path
     else
       flash[:notice] = 'Could not create a bid.'
       redirect_to request.referer
     end

  end

  # def destroy
  #   if @bid.destroy
  #     flash[:notice] = "Bid deleted."
  #     redirect_to bids_path
  #   else
  #     flash[:notice] = "Could not delete this bid."
  #     redirect_to request.referer
  #   end
  # end

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
      params.require(:bid).permit(:bid_percentage, :project_id).merge(user_id: current_user.id)
    end



end
