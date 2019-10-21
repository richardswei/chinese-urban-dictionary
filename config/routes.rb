Rails.application.routes.draw do
  
  # Home controller routes.
  root   'home#index'
  get    'auth'            => 'home#auth'
  
  # Get login token from Knock
  post   'user_token'      => 'user_token#create'
  
  # User actions
  get    '/users'          => 'users#index'
  get    '/users/current'  => 'users#current'
  post   '/users/create'   => 'users#create'
  patch  '/user/:id'       => 'users#update'
  delete '/user/:id'       => 'users#destroy'



  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    resources :tags do
      member do
        get 'get_relevant_definitions'
      end
    end
    resources :entries do
      collection do
        get :search
        get 'get_trending'
        get 'get_search_results'
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
