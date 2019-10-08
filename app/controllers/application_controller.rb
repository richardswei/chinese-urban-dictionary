class ApplicationController < ActionController::API

  def fallback_index_html
    render :file => 'public/index.html'
  end

  # def after_sign_in_path_for(user)
  #   if current_user.admin?
  #     admin_dashboard_path
  #   end 
  # end`
  protected

  # # before any action happens, it will authenticate the user
  # before_action :authenticate_user!
  
  # Sample route that shows you what you want to see.
  # Note the existence of this in routes.rb as well as the view in views/application/corgi.html.erb

end
