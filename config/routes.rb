Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.
  get "/", to: "application#root"
  get "corgi", to: "application#corgi"

  resources :entries, only: [:index, :show, :edit, :new, :create, :update]
  # ^This is shorthand for doing:
  # get "entries/", to: "entries#index"
  # get "entries/:id", to: "entries#show"
end
