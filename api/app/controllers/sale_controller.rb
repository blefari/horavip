class SaleController < ApplicationController

  before_action :authenticate_user!

  def listCurrent
    currentSales = current_user.current_sales
    return render json: currentSales.to_json(:include => {:sale => {
        :include => [{:sale_items => {
            :include => [:product, :professional]
        }}, :customer]
    }})
  end

  def createCurrent
    currentSale = CurrentSale.create(current_sale_params)
    sale = Sale.new
    sale.user = current_user
    sale.customer_id = params[:customerId]
    sale.date = Time.zone.now
    currentSale.sale = sale

    currentSale.user = current_user
    currentSale.save!

    return render json: currentSale.to_json(:include => {:sale => {
        :include => [{:sale_items => {
            :include => [:product, :professional]
        }}, :customer]
    }})
  end

  def updateCurrent
    currentSale = CurrentSale.find(params[:id])
    currentSale.update_attributes(current_sale_params)
    currentSale.save

    return render json: currentSale
  end

  def removeCurrent
    currentSale = CurrentSale.find(params[:id])
    currentSale.destroy

    return render json: currentSale
  end


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
    params.require(:sale).permit(:customer, :products)
  end

  def current_sale_params
    params.permit(:customer)
  end
  
end
