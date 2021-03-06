Rails.application.routes.draw do
  resources :logs
  resources :ratings, only: [:create]
  resources :comments, only: [:create, :update, :destroy,:edit]
  resources :likes, only: [:create]
  resources :projects
  resources :project_users
  resources :bids
  resources :digital_contracts, only: [:update, :edit]
  resources :bid_details, only: [:update, :edit]

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'        
  }
  get 'notifications' => 'notifications#index'
  get 'dashboard' => 'dashboards#index'
  post 'notify/seen' => 'notifications#seen'
  get 'bid/history' => 'bids#history'
  get 'home' => 'welcome#home'

  # root 'projects#index'
  root 'welcome#index'
end
