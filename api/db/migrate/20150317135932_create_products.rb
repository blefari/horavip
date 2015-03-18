class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|

      t.string :name
      t.decimal :price
      t.decimal :percentage
      t.boolean :active, default: true
      t.boolean :removed, default: false
      t.belongs_to :user, index: true

      t.timestamps null: false
    end
  end
end
