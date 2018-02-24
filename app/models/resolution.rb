class Resolution < ApplicationRecord

	has_many :bids, dependent: :destroy
	validates_presence_of :name

end
