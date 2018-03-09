class BidsController < ApplicationController
  before_action :set_bid, only: [:show, :edit, :update, :destroy]

  def index
    project_ids = current_user.projects.ids
    @bids = Bid.where(project_id: project_ids)
    case params[:resolution_id]
    when "1"
      @bids = @bids.add_collaborator
    when "2"
      @bids = @bids.remove_collaborator
    when "3"
      @bids = @bids.vote_dilution
    else
      @bids = @bids.add_collaborator
    end
  end

  def history
    @bids =  Bid.where("variables ->> 'user_id' = ?", current_user.id.to_s)
  end

  def create
      @bid = Bid.new(bid_params)
      @bid.initiater_id = current_user.id
      resolution = params[:bid][:resolution_id].to_i
      status, @bid = BidsProcessor.process(resolution, @bid, params)

      # Valid bid
      if status == true
        if @bid.save!
          flash[:notice] = 'Bid has been successfuly made.'
          redirect_to bids_path
        else
          flash[:alert] = 'Could not create a bid.'
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
      flash[:alert]="Bid Not Updated"
      redirect_to root_path
		end
	end


  def show
  end


    def set_bid
        @bid = Bid.find(params[:id])
    end

    def bid_params
      resolution = params[:bid][:resolution_id].to_i
      BidsProcessor.params(resolution, params)
    end
end
