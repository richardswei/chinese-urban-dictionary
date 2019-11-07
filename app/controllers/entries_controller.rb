class EntriesController < ApplicationController
  require 'chinese_pinyin'
  before_action :authenticate_user,  only: [:create]

  def index
    @entries = Entry.all
    render json: @entries.to_json
  end 

  def create 
    @entry = Entry.new(
      phrase: params[:phrase],
      pinyin: Pinyin.t(params[:phrase], tonemarks: true),
    )
    @entry.save
    render json: @entry.to_json
  end

  # Show will implicitly be passed an id in the params which can be accessed by params[:id]
  def show
    @entry = Entry.where(id: params[:id]).first
    @entry.increment!(:view_count)
    render json: @entry.to_json
  end

  def get_trending
    @results = Entry.order('view_count DESC').limit(10)
    render json: @results, :include => {:definitions => {:only => :definition}}
  end

  def search
    @results = Entry.search(params[:query])
    render json: @results.to_json
  end

end
