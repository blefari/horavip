class CustomerController < ApplicationController

  before_action :authenticate_user!

  def list
    customers = current_user.customers
    return render json: customers
  end

  def create
    customer = Customer.create(customer_params)
    customer.user = current_user
    customer.save!

    return render json: customer
  end

  def update
    customer = Customer.find(params[:id])
    customer.update_attributes(customer_params)
    customer.save

    return render json: customer
  end

  def remove
    customer = Customer.find(params[:id])
    customer.active = false
    customer.save!

    return render json: customer
  end

  private
  def customer_params
    params.require(:customer).permit(:name, :email, :phone)
  end

end
