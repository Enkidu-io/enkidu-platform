class BidsController < ApplicationController
  before_action :set_bid, only: [:show, :edit, :update, :destroy]
  before_action :is_percentage_avail? , only: [:create]
  before_action :authorized_for_resolution?, only: [:create]
  

  def index
    @bids = current_user.bids
  end

  def create
      @bid = Bid.new(bid_params) 
      if new_email = params[:bid][:email].present?
        if new_email == current_user.email
          flash[:notice] = "Cannot perform this action."
          redirect_to request.referer
        else
          project = Project.find(params[:bid][:project_id])
          if project.has_employee?(current_user.id)
            @bid.user_id = User.where(email: params[:bid][:email]).first.id
          else
            flash[:notice] = "You do not have enough permissions to perform this function."
            redirect_to request.referer
          end
        end
      end
      @bid.initiater_id = current_user.id
      if @bid.save!
       flash[:notice] = 'Bid has been successfuly made.'
       redirect_to bids_path
      else
       flash[:notice] = 'Could not create a bid.'
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

    def is_percentage_avail?
      if params[:bid][:resolution_id].to_i == 1
        project = Project.find(params[:bid][:project_id])
        bid_perc = params[:bid][:bid_percentage].to_f
        if project.unallocated_percentage < bid_perc
          flash[:notice] = "Bid could not be created as your demands cannot be met."
          redirect_to request.referer
        end
      end
    end

    def set_bid
        @bid = Bid.find(params[:id])
    end

    def bid_params
      params.require(:bid).permit(:bid_percentage, :project_id, :resolution_id, :vesting_period)
    end

    def authorized_for_resolution?
      if params[:bid][:resolution_id].to_i == 1 #allow everyone to create a bid with add collaborator
        return
      end
      project = Project.find(params[:bid][:project_id])
      project_users = project.project_users
      unless(project_users.find_by(user_id: current_user.id).present?)
        flash[:notice] = "Bid could not be created as your demands cannot be met."
        redirect_to request.referer
        return
      end
    end
end
