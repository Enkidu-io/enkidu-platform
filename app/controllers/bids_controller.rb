class BidsController < ApplicationController
  before_action :set_bid, only: [:show, :edit, :update, :destroy]
  before_action :is_percentage_avail? , only: [:create]

  def index
    @bids = current_user.bids
  end

  def create
      @bid = Bid.new(bid_params) 
      if params[:bid][:email].present?
        project = Project.find(params[:bid][:project_id])
        if project.is_an_employee?(current_user.id)
          @bid.user_id = User.where(email: params[:bid][:email]).first.id
        else
          flash[:notice] = "You do not have enough permissions to perform this function."
          redirect_to request.referer
        end
      else
        @bid.user_id = current_user.id #initiatiator id?
        if(request.referer == "/")
          #initiator id=> current_user, resolution => 1
          @bid.merge(initiator_id: current_user.id, resolution_id: 1)
        end
      end
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

    def is_percentage_avail?
      project = Project.find(params[:bid][:project_id])
      bid_perc = params[:bid][:bid_percentage]
      if project.unallocated_percentage < bid_perc
        flash[:notice] = "Bid could not be created as your demands cannot be met."
        redirect_to request.referer
      end
    end

    def set_bid
        @bid = Bid.find(params[:id])
    end

    def bid_params
      params.require(:bid).permit(:bid_percentage, :project_id, :resolution_id)
    end

end
