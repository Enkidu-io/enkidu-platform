class Notification < ApplicationRecord
	belongs_to :user
	belongs_to :notification_type
	validates_presence_of :user_id, :notification_type_id, :notification_description


	def group_by_criteria
  		created_at.to_date.to_s(:db)
  	end
end
