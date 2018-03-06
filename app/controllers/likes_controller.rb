class LikesController < ApplicationController

	def create
		like = Like.where(project_id: params[:like][:project_id], user_id: current_user.id).first
		if like.nil?
			like = Like.new(like_params)
			if like.save
				render json: { msg: "Like success", liked: true }, status: 200
			else
				render json: { msg: "Failed to like.", errors: like.errors }, status: 400
			end
		else
			if like.destroy
				render json: { msg: "Dislike success", liked: false }, status: 200
			else
				render json: { msg: "Failed to dislike.", errors: like.errors }, status: 400
			end
		end
	end

	private

		def like_params
			params.require(:like).permit(:project_id).merge(user_id: current_user.id)
		end
end
