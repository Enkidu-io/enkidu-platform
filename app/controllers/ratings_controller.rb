class RatingsController < ApplicationController

	def create
		rating = Rating.new(rating_params)
		if rating.save
			project = Project.find(params[:project_id])
			project.increment(:ratings_count, by = 1)
			project.save
			render json: { msg: "Project rated." }, status: 200
		else
			render json: { msg: "Failed to add rating.", errors: rating.errors}, status: 400
		end
	end

	private

		def rating_params
			params.require(:rating).permit(:project_id, :rating).merge(user_id: current_user.id)
		end
end
