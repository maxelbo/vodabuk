Rails.application.routes.draw do
  # Authentication
  resource :session, only: [:new, :create, :destroy]
  resources :passwords, param: :token

  # Admin user management
  resources :registrations, only: [:index, :new, :create, :destroy]

  # HTML dictionary interface
  root "words#index"
  get "about", to: "pages#about"
  get "activity", to: "activity#index"

  resources :words do
    collection do
      get "search"
      get "letter/:letter", action: :by_letter, as: :by_letter
    end
  end

  # JSON API
  namespace :api do
    namespace :v0 do
      namespace :volapuk do
        resources :words, only: [:index, :show, :create, :update] do
          collection do
            get "by_root/:root", action: :by_root, as: :by_root
            get "by_letter/:letter", action: :by_letter, as: :by_letter
          end
        end
      end
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
