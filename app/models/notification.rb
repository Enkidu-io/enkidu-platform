class Notification < ApplicationRecord
	belongs_to :user
	belongs_to :notification_type
end
