class CreateCurrentSales < ActiveRecord::Migration
def change
  create_table :current_sales do |t|
    t.references :sale
    t.belongs_to :user, index: true

    t.timestamps null: false
  end
end
end
