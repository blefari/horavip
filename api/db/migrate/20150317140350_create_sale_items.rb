class CreateSaleItems < ActiveRecord::Migration
  def change
    create_table :sale_items do |t|

      t.references :product
      t.references :professional
      t.belongs_to :sale, index: true
      t.boolean :removed, default: false

      t.timestamps null: false
    end
  end
end
