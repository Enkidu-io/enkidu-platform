class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  layout :layout_by_resource

  def layout_by_resource
    if devise_controller? && (resource_name == :user)  && action_name != 'edit' && action_name != 'update'
      "homepages"
    else
      "application"
    end
  end
end
