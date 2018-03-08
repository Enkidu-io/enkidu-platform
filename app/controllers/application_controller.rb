class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :set_notifications, if: :user_signed_in?
  layout :layout_by_resource

  def layout_by_resource
    if devise_controller? && (resource_name == :user)  && action_name != 'edit' && action_name != 'update'
      "homepages"
    else
      "application"
    end
  end
  
  def set_notifications
      @notifications = current_user.notifications.order(created_at: :desc).limit(6)
  end
end
