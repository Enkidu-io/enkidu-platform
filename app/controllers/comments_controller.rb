class CommentsController < ApplicationController

	def create

	end

	def update

	end

	def destroy

	end

	private

		def set_comment
			params.require(:comment).permit(:project_id, :comment).merge(user_id: current_user.id)
		end
end
