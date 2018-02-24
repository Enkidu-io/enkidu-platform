class Notification < ApplicationRecord

	belongs_to :user
	belongs_to :notification_type
	validates_presence_of :user_id, :notification_type_id, :notification_description
end
