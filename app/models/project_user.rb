class ProjectUser < ApplicationRecord

  	has_many :bids

	belongs_to :user
	belongs_to :project

end
