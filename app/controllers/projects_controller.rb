class ProjectsController < ApplicationController
	before_action :set_project, only: [:show]

	def index
		# Add search functionality
		@projects = Project.all.order(created_at: :desc)
	end

	def show
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

	end

	def destroy

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
