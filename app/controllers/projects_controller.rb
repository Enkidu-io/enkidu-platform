class ProjectsController < ApplicationController
	before_action :set_project, only: [:show]

	def index
		# Add search functionality
		@projects = Project.all.order(created_at: :desc)
	end

	def show
	end

	def create

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
	      # params.require(:project).permit()
	  	end
end
