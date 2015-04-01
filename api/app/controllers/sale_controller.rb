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
    currentSales = CurrentSale.joins(:sale).where(sales: {customer_id: params[:customerId]})

    if(currentSales.size > 0)
      return render json: {
          "error" => "current_sale.existing"
      }, status: 400
    end

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

  def addProduct
    currentSale = CurrentSale.find(params[:id])
    saleItem = SaleItem.new
    saleItem.product_id = params[:productId]
    saleItem.professional_id = params[:professionalId]
    currentSale.sale.sale_items << saleItem

    return render json: currentSale.to_json(:include => {:sale => {
        :include => [{:sale_items => {
            :include => [:product, :professional]
        }}, :customer]
    }})
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
    params.permit(:customer, :products)
  end
  
end
