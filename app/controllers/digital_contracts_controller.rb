class DigitalContractsController < ApplicationController

	before_action :set_dc, only: [:update]
	before_action :if_user_can_access_dc, only: [:update]

	def update
		@dc.eth_address = params[:digital_contract][:eth_address]
		if @dc.update
			flash[:notice] = "You have successfully signed a contract."
			redirect_to request.referer
		else 
			flash[:notice] = "Your attempt in signing this contract has failed."
			redirect_to request.referer
		end	
	end

	def edit

	end

	private

		def if_user_can_access_dc
			unless [@dc.leader.id, @dc.new_employee.id].include?(current_user.id)
				flash[:notice] = "You do not have enough permissions."
				redirect_to request.referer
			# elsif current_user.id == @dc.leader.id
				@dc.leader_signed = true
			# elsif current_user.id == @dc.new_employee.id
				@dc.user_signed = true
			end
		end

		def set_dc
			@dc = DigitalContract.find(params[:id])
		end

end
