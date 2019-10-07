Rails.application.routes.draw do
	devise_for :users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    resources :users
    resources :entries do
      collection do
        get 'get_trending'
      end
      resources :definitions do
        member do
          get 'get_tags'
        end
      end
    end
  end

  # set fallback for aanything that doesnt match client/index.html
  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
