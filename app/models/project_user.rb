class ProjectUser < ApplicationRecord
	belongs_to :user
	belongs_to :project

	validates_presence_of :ownership_percentage, :vesting_period
	validates :user_id, :uniqueness => { :scope => :project_id }
end
