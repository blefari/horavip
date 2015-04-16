class Sale < ActiveRecord::Base
  belongs_to :customer
  belongs_to :user

  has_many :sale_items

  accepts_nested_attributes_for :sale_items
end
