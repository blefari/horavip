Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: '/auth'

  scope 'api' do
    scope 'v1' do
      scope 'customer' do
        get '/' => 'customer#list'
        post '/' => 'customer#create'
        put '/:id' => 'customer#update'
        delete '/:id' => 'customer#remove'
      end

      scope 'professional' do
        get '/' => 'professional#list'
        post '/' => 'professional#create'
        put '/:id' => 'professional#update'
        delete '/:id' => 'professional#remove'
      end

      scope 'product' do
        get '/' => 'product#list'
        post '/' => 'product#create'
        put '/:id' => 'product#update'
        delete '/:id' => 'product#remove'
      end

      scope 'sale' do
        get '/current' => 'sale#listCurrent'
        post '/current' => 'sale#createCurrent'
        put '/current/:id' => 'sale#updateCurrent'
        delete  '/current:id' => 'sale#removeCurrent'

        put '/current/:id/product' => 'sale#addProduct'

        get '/' => 'sale#list'
        post '/' => 'sale#create'
        put '/:id' => 'sale#update'
        delete  '/:id' => 'sale#remove'
      end
    end
  end

end
