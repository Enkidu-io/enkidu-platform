Rails.application.routes.draw do
  resources :ratings, only: [:create]
  resources :comments, only: [:create, :update, :destroy]
  resources :likes, only: [:create]
  resources :projects
  resources :project_users
  resources :bids
  resources :digital_contracts, only: [:update]
  resources :bid_details, only: [:update]

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'        
  }
  get 'notification' => 'welcome#set_notifications'
  get 'dashboard' => 'dashboards#index'

  # get '/notif/:notification_type_id/bid/:bid_id'
  root 'projects#index'
  get 'welcome/index'
end
