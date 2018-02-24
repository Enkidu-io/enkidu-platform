class NotificationType < ApplicationRecord

	has_many :notifications, dependent: :destroy
	validates_presence_of :notification_content

end
