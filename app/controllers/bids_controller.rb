class BidsController < ApplicationController

  def index
    @bids=current_user.bids
  end

  def new
    @bids=Bid.new
  end

  def create

      @bid = Bid.new(bid_params)
      if @bid.save
       flash[:notice] = 'done'
     else
       flash[:notice] = 'failed'
     end

  end

  def destroy
    @bid.destroy
		redirect_to root_path
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

  def bid_params
    params.require(:bid).permit(:bid_percentage).merge(user_id: current_user.id ,project_id: project_id,resolution_id: resolution_id)
  end



end
