class ProjectUser < ApplicationRecord
<<<<<<< HEAD
  has_many :bids
=======
	belongs_to :user
	belongs_to :project
>>>>>>> f5bb148e7e632a0eec3920cf089c2ed71ff19ce4
end
