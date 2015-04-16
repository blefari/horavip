class DropCurrentSales < ActiveRecord::Migration
  def change
    drop_table :current_sales
  end
end
