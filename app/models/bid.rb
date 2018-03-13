class Bid < ApplicationRecord
  belongs_to :project
  belongs_to :user, :class_name => 'User', :foreign_key => 'initiater_id'
  belongs_to :resolution
  has_many :bid_details, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_many :digital_contracts, dependent: :destroy


  after_commit :create_log, on: :create
  after_commit :create_bid_details, on: :create
  before_validation :format_data

  validates_presence_of :project_id, :resolution_id, :initiater_id
  validates_presence_of :bid_percentage, :user_id, :vesting_period, if: proc { resolution_id == 1 }
  validates_presence_of :user_id, if: proc { resolution_id == 2 }
  validates_presence_of :bid_percentage, if: proc { resolution_id == 3 }
  validates :bid_percentage, numericality: { only_float: true, greater_than: 0.0, less_than: 100.0 }, if: proc { [1,3].include? resolution_id }
  validates :vesting_period, numericality: { only_integer: true, greater_than: 0 }, if: proc { resolution_id == 1 }
  
  store_accessor :variables, :user_id, :bid_percentage, :vesting_period

  scope :add_collaborator,    -> {where(resolution_id: 1)}
  scope :remove_collaborator, -> {where(resolution_id: 2)}
  scope :vote_dilution,       -> {where(resolution_id: 3)}

  def create_log
    Log.create(content: LogDescription.get('create_bid', {'resolution_name': self.resolution.name}), user_id: self.initiater_id, project_id: self.project_id)
  end

  def create_bid_details
    project = self.project
    total_bid_perc = project.project_users.sum(&:ownership_percentage)
  	project.project_users.each do |p_u|
      # Calculate percentage only considering project users
      user_perc = ((p_u.ownership_percentage.to_f/total_bid_perc.to_f).to_f * 100).to_f
  		BidDetail.create(bid_id: self.id, user_id: p_u.user_id, approval_percentage: user_perc)
  	end
  end

  def format_data
    self.bid_percentage = self.bid_percentage.to_f if self.bid_percentage.present?
    self.vesting_period = self.vesting_period.to_i if self.vesting_period.present?
  end
end
