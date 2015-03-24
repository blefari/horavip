class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  rescue_from ActiveRecord::RecordNotUnique, with: :record_not_unique

  respond_to :json
  private
  def record_not_unique
    render :json => {:error => "record_not_unique"}, :status => 400
  end
end
