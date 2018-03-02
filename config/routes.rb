Rails.application.routes.draw do
  resources :ratings, only: [:create]
  resources :comments, only: [:create, :update, :destroy]
  resources :likes, only: [:create, :destroy]
  get 'welcome/index'

  devise_for :users, controllers: {
        sessions: 'users/sessions',
        registrations: 'users/registrations'        
      }

  resources :projects
  resources :project_users
  resources :bids

  get 'dashboard' => 'dashboards#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'projects#index'
end
