class Bid < ApplicationRecord
  belongs_to :project
  belongs_to :user, :class_name => 'User', :foreign_key => 'initiater_id'
  belongs_to :resolution
  has_many :bid_details

  after_commit :create_bid_details, on: :create

  validates_presence_of :project_id, :resolution_id, :initiater_id
  validates_presence_of :bid_percentage, :user_id, :vesting_period, if: proc { resolution_id == 1 }
  validates_presence_of :user_id, if: proc { resolution_id == 2 }
  validates_presence_of :bid_percentage, if: proc { resolution_id == 3 }
  validates :bid_percentage, numericality: { only_float: true, greater_than: 0.0, less_than: 100.0 }, if: proc { [1,3].include? resolution_id }
  validates :vesting_period, numericality: { only_integer: true, greater_than: 0 }, if: proc { resolution_id == 1 }
  
  store_accessor :variables, :user_id, :bid_percentage, :vesting_period

  scope :add_collaborator, -> { where(resolution_id: 1) }
  scope :remove_collaborator, -> { where(resolution_id: 2) }
  scope :vote_dilution, -> { where(resolution_id: 3) }

  def create_bid_details
  	project = self.project
  	project.project_users.each do |p_u|
  		BidDetail.create!(bid_id: self.id, user_id: p_u.user_id, approval_percentage: p_u.ownership_percentage)
  	end
  end
end
