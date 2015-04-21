Rails.application.routes.draw do
  get 'search/index'
  get 'info/examples'
  get 'info/help'
  get 'info/about'
  get 'info/down'
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
  #get 'swagger/dist/index.html'
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
	get '/api' => redirect('/swagger-ui/dist/index.html?url=/apidocs/api-docs.json')

  namespace :api do
    namespace :v1 do
    	post 'careers' => 'careers#show'
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
    	get 'cost_of_living' => 'coli#index'										# Get coli names for autocomplete.
    	get 'cost_of_living/best' => 'coli#show_best'
      get 'cost_of_living/worst' => 'coli#show_worst'
      get 'cost_of_living/cheapest' => 'coli#show_cheapest'
      get 'cost_of_living/priciest' => 'coli#show_priciest'
      get 'cost_of_living/random' => 'coli#show_random'
    	get 'cost_of_living/:state' => 'coli#show_state'				# Get cost of living data by state.
    	get 'cost_of_living/:state/:city' => 'coli#show_city'		# Get cost of living data by state and city.
    	post 'cost_of_living/compare' => 'coli#show_two'				# Get cost of living data for comparison.

      # Schools.
      get 'schools' => 'schools#index'												# Get school names for autocomplete.
      get 'schools/best' => 'schools#show_best'
      get 'schools/worst' => 'schools#show_worst'
      get 'schools/cheapest' => 'schools#show_cheapest'
      get 'schools/priciest' => 'schools#show_priciest'
      get 'schools/random' => 'schools#show_random'
      get 'schools/:name' => 'schools#show'										# Get school by name.
      get 'schools/location/:location' => 'schools#show_location'	# Get schools by location.
      post 'schools/compare' => 'schools#show_two', as: 'schools_compare'
      put 'schools/:name/:rating' => 'schools#rate'

      # Degrees.
      get 'degrees' => 'degrees#index'												# Get degree names for autocomplete.
      get 'degrees/best' => 'degrees#show_best'
      get 'degrees/worst' => 'degrees#show_worst'
      get 'degrees/random' => 'degrees#show_random'
      get 'degrees/:name' => 'degrees#show'										# Get degree by name.
      get 'degrees/:level/:name' => 'degrees#show_level_name'	# Get degree by level and name.
      post 'degrees/compare' => 'degrees#show_two'						# Get degree data for comparison.
      put 'degrees/:level/:name/:rating' => 'degrees#rate'

      # Careers.
      get 'careers' => 'careers#index'												# Get career names for autocomplete.
      get 'careers/best' => 'careers#show_best'
      get 'careers/worst' => 'careers#show_worst'
      get 'careers/random' => 'careers#show_random'
      get 'careers/:name' => 'careers#show'										# Get career by name.
      post 'careers/compare' => 'careers#show_two'						# Get career data for comparison.
      put 'careers/:name/:rating' => 'careers#rate'

      # Users.
    	get 'users/new' => '/user#register'											# Go to the register form.
      post 'users' => 'users#create'													# Register a new user.
      get 'users/:id/completed' => 'users#show_completed'
      post 'users/:id/completed' => 'users#create_completed'
      get 'user/:id/prefers_autocomplete' => 'users#show_autocomplete'
      patch 'users/:id' => 'users#update'
      get 'users/:id/ratings' => 'users#show_ratings'
     	get 'users/:id/spending_breakdown' => 'spending_breakdown#show'
     	get 'users/:id/spending_breakdown/income' => 'spending_breakdown#show_income'
     	put 'users/:id/spending_breakdown/income' => 'spending_breakdown#update_income'
     	get 'users/:id/spending_breakdown/:category' => 'spending_breakdown#show_category'
      put 'users/:id/spending_breakdown/:category' => 'spending_breakdown#update_all'
      patch 'users/:id/spending_breakdown/:category' => 'spending_breakdown#update'
      delete 'users/:id/spending_breakdown/:category/:name' => 'spending_breakdown#destroy'
      post 'users/validate' => 'users#validate'								# Validate a username and password.
      get 'users/:id' => 'users#show'													# Get user profile data.
      post 'users/:id/query' => 'users#create_query'
      get 'users/:id/query' => 'users#show_query'
    end
  end
end
