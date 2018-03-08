class NotificationsController < ApplicationController

	def index
	 	@notifications = current_user.notifications.order(created_at: :desc)
     	@dates = @notifications.group_by{|x| x.created_at.strftime("%Y-%m-%d")} 
	end

end
