class RatingsController < ApplicationController

	def create
		rating = Rating.new(rating_params)
		STDOUT.puts "RATING - "+params[:rating][:rating]
		if rating.save
			project = Project.find(params[:rating][:project_id])
			prev_rating = project.ratings_count
			prev_count = project.ratings.count
			rating=(prev_rating+(params[:rating][:rating]).to_i)/(prev_count+1)
			STDOUT.
			project.update(ratings_count: rating)
			project.save
			render json: { msg: "Project rated.", rated: true}, status: 200
		else
			render json: { msg: "Failed to add rating.", errors: rating.errors}, status: 400
		end
	end

	private

		def rating_params
			params.require(:rating).permit(:project_id, :rating).merge(user_id: current_user.id)
		end
end