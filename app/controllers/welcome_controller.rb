class WelcomeController < ApplicationController
  def index
  end

  def testmodal

  end
  def set_notifications
      @notifications = current_user.notifications.order(created_at: :desc)
      @dates = @notifications.group_by{|x| x.created_at.strftime("%Y-%m-%d")} 
      @dates = @dates["2018-03-07"]


  end

end
