class SaleController < ApplicationController

  before_action :authenticate_user!

  def list
    sales = current_user.sales.where(ongoing: true)
    return render json: sales.to_json(:include => [{:sale_items => {
        :include => [:product, :professional]
    }}, :customer])
  end

  def create
    sale = Sale.create(sale_params)
    sale.user = current_user
    sale.save!

    return render json: sale
  end

  def update
    sale = Sale.find(params[:id])
    sale.update_attributes(sale_params)
    sale.save

    return render json: sale
  end

  def remove
    sale = Sale.find(params[:id])
    sale.active = false
    sale.save!

    return render json: sale
  end

  private
  def sale_params
    params.require(:sale).permit(:date, :total, :customer, :products)
  end
  
end
