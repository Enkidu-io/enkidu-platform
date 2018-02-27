class LikesController < ApplicationController

	def create
		like = Like.new(like_params)
		if like.save
			render json: { msg: "Like success" }, status: 200
		else
			render json: { msg: "Failed to add like.", errors: like.errors }, status: 400
		end
	end

	def destroy
		if @like.destroy
			render json: { msg: "Unlike success" }, status: 200
		else
			render json: { msg: "Failed to add unlike.", errors: @like.errors }, status: 400
		end
	end

	private

		def set_like
			@like = Like.find(params[:id])
		end

		def like_params
			params.require(:like).permit(:project_id).merge(user_id: current_user.id)
		end
end
