Rails.application.routes.draw do
  resources :contractors do 
    resources :projects, only: [:index, :show, :update]
  end
  resources :projects, only: [:index, :new, :create, :update, :delete, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  get '*other', to: 'static#index'
end
