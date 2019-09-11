class V1::ThingsController < ApplicationController
	def index
		render json: { :things => [
				{
					:name =>'something',
					:guid => 'thisthat'
				}
			]
		}.to_json
		
	end
end