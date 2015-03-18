class SaleItem < ActiveRecord::Base
  belongs_to :professional
  belongs_to :product
  belongs_to :sale
end
