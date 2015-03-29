class CreateSales < ActiveRecord::Migration
  def change
    create_table :sales do |t|

      t.datetime :date
      t.references :customer
      t.boolean :removed, default: false
      t.belongs_to :user, index: true

      t.timestamps null: false
    end
  end
end
