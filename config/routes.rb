Rails.application.routes.draw do
  resources :ratings, only: [:create]
  resources :comments, only: [:create, :update, :destroy]
  resources :likes, only: [:create, :destroy]
  resources :projects
  resources :project_users
  resources :bids

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'        
  }

  get 'dashboard' => 'dashboards#index'

  # get '/notif/:notification_type_id/bid/:bid_id'
  root 'projects#index'
  get 'welcome/index'
end
