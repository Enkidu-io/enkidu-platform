class DashboardsController < ApplicationController
	def index
		@projects = Project.all
	end
end
