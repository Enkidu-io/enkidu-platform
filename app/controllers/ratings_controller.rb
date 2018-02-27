class RatingsController < ApplicationController

	def create

	end

	private

		def set_rating
			params.require(:rating).permit(:project_id, :rating).merge(user_id: current_user.id)
		end
end
