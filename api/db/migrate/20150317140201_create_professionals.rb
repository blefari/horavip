class CreateProfessionals < ActiveRecord::Migration
  def change
    create_table :professionals do |t|

      t.string :name
      t.string :phone
      t.string :email
      t.boolean :active, default: true
      t.boolean :removed, default: false
      t.belongs_to :user, index: true
      
      t.timestamps null: false
    end
  end
end
