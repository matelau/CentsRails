Rails.application.routes.draw do
  get 'search/index'
  get 'info/examples'
  get 'info/help'
  get 'info/about'
  get 'wizard/start'
  get 'wizard/education'
  get 'wizard/career'
  get 'wizard/city'
  get 'wizard/major'
  get 'wizard/school'
  get 'wizard/spending'
  get 'user/profile'
  get 'user/register'
  get 'user/registered', as: 'registered'
  post 'user/register' => 'user#create', as: 'register'
  get 'user/login' => 'sessions#new'
  post 'user/login' => 'sessions#create'
  get 'user/logout' => 'sessions#destroy'
  get 'user/confirm' => 'to_be_validated_users#confirm'
  get 'user/confirmed'
  get 'search/results'
  get 'search/getPartial'
  root 'search#index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
  namespace :api do
    namespace :v1 do
      post 'coli' => 'coli#show'
      post 'register' => 'register#create'
      post 'login' => 'login#create'
      post 'logout' => 'logout#destroy'
      post 'confirm' => 'confirm#show'
      post 'schools' => 'schools#show'
      post 'record_names' => 'record_names#show'
      post 'majors' => 'majors#show'
      get  'career' => 'career#show'
      post 'spending_breakdown' => 'spending_breakdown#save'
      get 'spending_breakdown/:user_id' => 'spending_breakdown#load'
      delete 'spending_breakdown/:user_id' => 'spending_breakdown#delete'
    end
  end
end
