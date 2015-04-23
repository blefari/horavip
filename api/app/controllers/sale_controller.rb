class SaleController < ApplicationController

  before_action :authenticate_user!

  def addProduct
    sale = Sale.find(params[:id])
    saleItem = SaleItem.new
    saleItem.product_id = params[:productId]
    saleItem.professional_id = params[:professionalId]
    sale.sale_items << saleItem

    return render json: saleItem.to_json(:include => [:product, :professional])
  end

  def removeProduct
    saleItem = SaleItem.find(params[:id])
    saleItem.destroy
    return render json: saleItem
  end


  def list
    sales = current_user.sales.where(status: params[:status])
    return render json: sales.to_json(:include => [{:sale_items => {
        :include => [:product, :professional]
    }}, :customer])
  end

  def create
    currentSales = Sale.where(customer_id: params[:customerId], status: 'ONGOING')

    if(currentSales.size > 0)
      return render json: {
          "error" => "current_sale.existing"
      }, status: 400
    end

    sale = Sale.new
    sale.user = current_user
    sale.customer_id = params[:customerId]
    sale.status = 'ONGOING'
    sale.date = Time.zone.now
    sale.save!

    return render json: sale.to_json(:include => [{:sale_items => {
        :include => [:product, :professional]
    }}, :customer])
  end

  def completeSale
    sale = Sale.find(params[:id])
    sale.status = 'COMPLETED'
    sale.date = Time.zone.now
    sale.payment_method = params[:paymentMethod]
    sale.save

    return render json: sale.to_json(:include => [{:sale_items => {
        :include => [:product, :professional]
    }}, :customer])
  end

  def remove
    sale = Sale.find(params[:id])
    sale.destroy!

    return render json: sale
  end

  private
  def sale_params
    params.require(:sale).permit(:payment_method, :status, sale_items: [])
  end

end
