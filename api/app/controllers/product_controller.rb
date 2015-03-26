class ProductController < ApplicationController

  before_action :authenticate_user!

  def list
    products = current_user.products
    return render json: products
  end

  def create
    product = Product.create(product_params)
    product.user = current_user
    product.save!

    return render json: product
  end

  def update
    product = Product.find(params[:id])
    product.update_attributes(product_params)
    product.save

    return render json: product
  end

  def remove
    product = Product.find(params[:id])
    product.active = false
    product.save!

    return render json: product
  end

  private
  def product_params
    params.require(:product).permit(:name, :price, :percentage)
  end
end
