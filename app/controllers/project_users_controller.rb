class ProjectUsersController < ApplicationController

	def index
		@projects = Project.all.order(created_at: :desc)
		@project = Project.new
		@project_users = @project.users
	end
	def create

	end

	def remove

	end

end
