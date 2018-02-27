class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :project
  validates_inclusion_of :rating, :in => 1..5
end
