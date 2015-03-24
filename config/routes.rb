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
  get 'user/login' => 'sessions#new', as: 'user_login'
  post 'user/login' => 'sessions#create'
  get 'user/logout' => 'sessions#destroy'
  get 'search/results'
  get 'search/getPartial'
  get 'user/terms'
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
      post 'spending_breakdown' => 'spending_breakdown#save'
      get 'spending_breakdown/:user_id' => 'spending_breakdown#load'
      delete 'spending_breakdown/:user_id' => 'spending_breakdown#delete'
    end

    namespace :v2 do
    	# Cost of living.
    	get 'cost_of_living' => 'coli#index'									# Get coli record names for autocomplete.
    	get 'cost_of_living/:state' => 'coli#show_state'			# Get cost of living data by state.
    	get 'cost_of_living/:state/:city' => 'coli#show_city'	# Get cost of living data by state and city.
    	post 'cost_of_living' => 'coli#show_two'							# Get cost of living data.

      # Schools.
      get 'schools' => 'schools#index'											# Get school record names for autocomplete.
      get 'schools/:name' => 'schools#show'									# Get school by name.
      post 'schools' => 'schools#show_two'									# Get school data.

      # Majors.
      get 'majors' => 'majors#index'												# Get major record names for autocomplete.
      get 'majors/:name' => 'majors#show'										# Get major by name.
      post 'majors' => 'majors#show_two'										# Get major data.

      # Careers.
      get 'careers' => 'careers#index'											# Get career record names for autocomplete.
      get 'careers/:name' => 'careers#show'									# Get career by name.
      post 'careers' => 'careers#show_two'									# Get career data.

      # Users.
    	get 'users/new' => '/user#register'										# Go to the register form.
      post 'users' => 'users#create'												# Register a new user.
      get 'users/:email' => 'users#show'										# Confirm that a user exists.
      post 'users/:email' => 'users#validate'								# Validate a username and password.
     	
     	# Spending breakdown. 
     	get 'spending_breakdown/:id' => 'spending_breakdown#show'
      put 'spending_breakdown/:id' => 'spending_breakdown#update'
      patch 'spending_breakdown/:id' => 'spending_breakdown#update'
    end
  end
end
