class NotificationsController < ApplicationController

	def index
	 	@notifications = current_user.notifications.order(created_at: :desc)
	 	# render json: @notifications
     	@dates = @notifications.group_by{|x| x.created_at.strftime("%Y-%m-%d")} 
      	# @dates = @dates["2018-03-07"]
      	# render json: @dates
	end

end
