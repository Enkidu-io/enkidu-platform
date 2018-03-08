class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :project_users, dependent: :destroy
  has_many :projects, through: :project_users
  has_many :notifications, dependent: :destroy
  has_many :bids
  has_many :bid_details
  has_many :notifications 
  has_many :logs, dependent: :destroy

  before_validation :format_data, on: :create

  validates_presence_of :email, :first_name, :last_name, :age, :job_profile
  validates_inclusion_of :age, :in => 1..100

  def full_name
    first_name.to_s+" "+last_name.to_s
  end

  def has_rated_project?(p_id)
    Rating.where(user_id: self.id, project_id: p_id).first ? true : false
  end

  def has_liked_project?(p_id)
    Like.where(user_id: self.id, project_id: p_id).first ? true : false
  end

  def format_data
    self.last_notified_at = DateTime.now
  end
end
