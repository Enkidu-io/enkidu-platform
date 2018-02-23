Rails.application.routes.draw do
  get 'welcome/index'

  devise_for :users
  resource :projects
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'
end
