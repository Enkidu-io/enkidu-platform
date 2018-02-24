class ProjectsController < ApplicationController
	before_action :set_project, only: [:show, :edit, :update, :destroy]

	def index
		# Add search functionality
		@projects = Project.all.order(created_at: :desc)
		@project = Project.new
	end

	def show
		@users = @projects.users
	end

	def create
		@project = Project.new(project_params)
		@project.ip_ownership_id = current_user.id
		@project.unallocated_percentage = (100 - params[:project][:leader_allocation])
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

	private

		def set_project
      		@project = Project.find(params[:id])
    	end

	    # Never trust parameters from the scary internet, only allow the white list through.
	    def project_params
	      params.require(:project).permit(:title, :description)
	  	end
end
