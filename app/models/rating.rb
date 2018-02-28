class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :project
  validates_presence_of :rating
  validates_inclusion_of :rating, :in => 1..5
  validates :user_id, :uniqueness => { :scope => :project_id }
end
