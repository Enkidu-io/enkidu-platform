class WelcomeController < ApplicationController
  def index
  end

  def testmodal

  end
  def set_notifications
      @notifications = current_user.notifications.order(created_at: :desc)


  end

end
