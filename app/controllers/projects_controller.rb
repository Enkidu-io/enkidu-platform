class ProjectsController < ApplicationController
	before_action :set_project, only: [:show, :edit, :update, :destroy]

	def index
		# Add search functionality
		@project = Project.new
		@project_users = @project.users
		@bid = Bid.new

		@search = Project.ransack(params[:q])
		@projects = @search.result.order(created_at: :desc).select { |p| p unless p.has_employee?(current_user.id)  }
	end

	def show
		@project_users = @project.project_users
		@comments = @project.comments.order(created_at: :desc)
		View.create(project_id: @project.id, user_id: current_user.id)
	end

	def create
		@project = Project.new(project_params)
		@project.unallocated_percentage = (100 - params[:project][:leader_allocation].to_f - params[:project][:treasury_percentage].to_f)
		@project.tag_list.add(params[:project][:tags], parse: true)
		if @project.save
			flash[:notice] = "Project created successfully."
			redirect_to projects_path
		else
			flash[:notice] = "Could not create project."
			redirect_to request.referer
		end
	end

	def update
		if @project.update!(project_params)
			flash[:notice] = "Updated project"
			redirect_to @project
		else
			flash[:notice] = "Failed to update project"
			redirect_to request.referer
		end
	end

	def destroy
		if @project.destroy
			flash[:notice] = "Deleted project"
			redirect_to projects_path
		else
			flash[:notice] = "Failed to delete project"
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
