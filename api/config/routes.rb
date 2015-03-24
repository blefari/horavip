Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: '/auth'

  scope 'api' do
    scope 'v1' do
      scope 'customer' do
        get '/' => 'customer#list'
      end
    end
  end

end
