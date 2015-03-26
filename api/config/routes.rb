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
    end
  end

end
