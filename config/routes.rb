Rails.application.routes.draw do
  get 'welcome/index'

  devise_for :users
  resources :projects

  resources :bids
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'projects#index'

  # get '/project/:project_id/bid/:bid_id' => ''
end
