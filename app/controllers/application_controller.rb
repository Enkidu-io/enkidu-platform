class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!, unless: proc { controller_name == 'welcome' && action_name == 'index' }
  before_action :set_data, if: :user_signed_in?
  layout :layout_by_resource

  def layout_by_resource
    if controller_name == 'welcome' && action_name == 'index'
      "landing"
    elsif devise_controller? && (resource_name == :user)  && action_name != 'edit' && action_name != 'update'
      "homepages"
    else
      "application"
    end
  end
  
  def set_data
      @project = Project.new
      @notifications = current_user.notifications.order(created_at: :desc).limit(6)
      @logs = current_user.logs.where("created_at >= ?", 1.week.ago.utc).order(created_at: :desc)
  end

  def after_sign_in_path_for(resource)
    STDOUT.puts "AFTER SIGNIN"
    # if resource.admin?
    #   rails_admin_path
    # else
      home_path
    # end
  end
end