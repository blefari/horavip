class AddPaymentMethodToSale < ActiveRecord::Migration
  def change
    add_column :sales, :payment_method, :string
  end
end
