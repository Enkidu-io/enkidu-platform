class LikesController < ApplicationController

	def create

	end

	def destroy

	end

	private

		def set_like
			params.require(:like).permit(:project_id).merge(user_id: current_user.id)
		end
end
