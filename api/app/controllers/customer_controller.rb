class CustomerController < ApplicationController

  before_action :authenticate_user!

  def list
    customers = current_user.customers.where(active: true)
    return render json: customers
  end
end
