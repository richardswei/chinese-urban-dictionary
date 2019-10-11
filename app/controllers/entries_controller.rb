class EntriesController < ApplicationController
  # before_action :authenticate_user!, only: [:new, :edit]

  def index
    @entries = Entry.all
    render json: @entries.to_json
  end 

  def create 
    @entry = Entry.new(
      phrase: params[:phrase],
      pinyin: params[:pinyin],
    )
    @entry.save
    render json: @entry.to_json
  end

  # Show will implicitly be passed an id in the params which can be accessed by params[:id]
  def show
    @entry = Entry.where(id: params[:id]).first
    # if current_user.present?
    #   @entry.increment!(:view_count)
    # end
    # NB: @entry might be nil if we were passed an invalid id.
    render json: @entry.to_json
  end

  def get_trending
    @results = Entry.order('view_count DESC').limit(5)
    render json: @results.to_json
  end

  def search
    @results = Entry.search(params[:query])
    render json: @results.to_json
  end

end
