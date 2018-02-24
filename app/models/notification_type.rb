class NotificationType < ApplicationRecord
	has_one :notification, dependent: :destroy
	validates_presence_of :notification_content
end
