class DefinitionsController < ApplicationController
	def index
		@definitions = Definition.where(entry_id: params[:entry_id])
		render json: @definitions.to_json
	end

  # Show will implicitly be passed an id in the params which can be accessed by params[:id]
  def show
    @definition = Definition.where(id: params[:id]).first
    render json: @definition.to_json
  end

  def get_tags
  	tag_ids = Tagging.where(definition_id: params[:id]).pluck('tag_id')
  	@tags = Tag.find(tag_ids)
  	render json: @tags.to_json
  end

  def create 
    @definition = Definition.new(
      definition: params[:definition],
      usage: params[:usage],
      usage_translation: params[:usage_translation]
    )
    # @definition.entry_id = params[:entry_id]
    # @definition.user_id = current_user.id
    @definition.save
  end

end
