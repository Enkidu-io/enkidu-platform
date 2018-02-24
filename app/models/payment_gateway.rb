require 'resolv'

class PaymentGateway < ApplicationRecord
	belongs_to :project
	validates_presence_of :domain, :project_id, :price_rate
	validate :domain_exists

	def domain_exists
	    Resolv::DNS.open { |dns| dns.timeouts = 3; @mx = dns.getresources(domain, Resolv::DNS::Resource::IN::MX) + dns.getresources(domain, Resolv::DNS::Resource::IN::A) }
	    errors.add(:domain, "Domain is not accessible. Please enter a valid domain.") if @mx.size < 1
  	end
end
