Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
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
