class ProjectsController < ApplicationController
	before_action :set_project, only: [:show, :edit, :update, :destroy]

	def index
		@project = Project.new
		@project_users = @project.users
		@bid = Bid.new

		order_params = params[:order]
		if order_params
			unless ["likes_count", "views_count", "ratings_count", "comments_count"].include?(order_params)
				flash[:alert] = "Something went very wrong. Please try again."
				redirect_to request.referer
			end
			order_params = order_params + " desc"
		end
		order_projects_by = "created_at desc" unless order_params.present?
		@search = Project.ransack(params[:q])
		@projects = @search.result.order("#{order_params}").select { |p| p unless p.has_employee?(current_user.id)  }
	end

	def show
			
		@project_users = @project.project_users
		@project.increment!(:view_count)
		@comments = @project.comments.order(created_at: :desc)
		@project.increment(:views_count, by = 1)
		@project.save
	end

	def create
		@project = Project.new(project_params)
		@project.unallocated_percentage = (100 - params[:project][:leader_allocation].to_f - params[:project][:treasury_percentage].to_f)
		@project.tag_list.add(params[:project][:tags], parse: true)
		if @project.save
			flash[:notice] = "Project created successfully."
			redirect_to projects_path
		else
			flash[:alert] = "Could not create project."
			redirect_to request.referer
		end
	end

	def update
		if @project.update!(project_params)
			flash[:notice] = "Updated project"
			redirect_to @project
		else
			flash[:alert] = "Failed to update project"
			redirect_to request.referer
		end
	end

	def destroy
		if @project.destroy
			flash[:notice] = "Deleted project"
			redirect_to projects_path
		else
			flash[:alert] = "Failed to delete project"
			redirect_to request.referer
		end
	end

	def test
		@bid = Bid.new
		@projects = Project.all.order(created_at: :desc)
		@project = Project.new
		@project_users = @project.users

	end

	private

		def set_project
      		@project = Project.find(params[:id])
    	end

	    # Never trust parameters from the scary internet, only allow the white list through.
	    def project_params
	      params.require(:project).permit(:title, :description, :leader_allocation, :treasury_percentage).merge(leader_id: current_user.id, ip_ownership_id: current_user.id)
	  	end
end