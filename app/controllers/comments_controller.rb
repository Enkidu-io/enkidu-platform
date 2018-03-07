class CommentsController < ApplicationController

	before_action :set_comment, only: [:update, :destroy]

	def create
		comment = Comment.new(comment_params)
		if comment.save
			project = Project.find(params[:project_id])
			project.increment(:comments_count, by = 1)
			project.save
			redirect_to request.referer
		else
			flash[:notice] = "Your comment could not be saved."
			redirect_to request.referer
		end
	end

	def update
		if @comment.update!(comment: params[:comment][:comment])
			flash[:notice] = "Your comment has been updated."
			redirect_to request.referer
		else
			flash[:notice] = "Your comment could not be updated."
			redirect_to request.referer
		end
	end

	def destroy
		if @comment.destroy
			flash[:notice] = "Your comment has been deleted."
			redirect_to request.referer
		else
			flash[:notice] = "Your comment could not be deleted."
			redirect_to request.referer
		end
	end

	private

		def set_comment
			@comment = Comment.find(params[:id])
		end

		def comment_params
			params.require(:comment).permit(:project_id, :comment).merge(user_id: current_user.id)
		end
end
