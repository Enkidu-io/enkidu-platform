class DigitalContractsController < ApplicationController

	before_action :set_dc, only: [:update, :edit]
	before_action :if_user_can_access_dc, only: [:update, :edit]

	def update

		if current_user.id == @dc.new_employee.id && params[:digital_contract][:eth_address].empty?
			flash[:alert] = "Eth Address is required."
			redirect_to request.referer
		else
			if current_user.id == @dc.new_employee.id
				@dc.eth_address = params[:digital_contract][:eth_address]
			end
			
			if @dc.save
			full_name = current_user.id == @dc.leader.id ? @dc.new_employee.full_name : @dc.leader.full_name
			Log.create(content: LogDescription.get('signed_contract', {'full_name': full_name }), user_id: current_user.id, project_id: @dc.bid.project_id)
			flash[:notice] = "You have successfully signed a contract."
			redirect_to root_path
		else 
			flash[:notice] = "Your attempt in signing this contract has failed."
			redirect_to request.referer
		end	
		end
	end

	def edit
	end

	private

		def if_user_can_access_dc
			if not [@dc.leader.id, @dc.new_employee.id].include?(current_user.id)
				flash[:notice] = "You do not have enough permissions."
				redirect_to request.referer
			elsif current_user.id == @dc.leader.id
				if @dc.leader_signed == true
					flash[:alert] = "You've already signed the contract"
					redirect_to root_path
				end
				@dc.leader_signed = true
			elsif current_user.id == @dc.new_employee.id
				if @dc.user_signed == true
					flash[:alert] = "You've already signed the contract"
					redirect_to root_path
				end
				@dc.user_signed = true
			end
		end

		def set_dc
			@dc = DigitalContract.find(params[:id])
		end

end
