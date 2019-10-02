class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  def authenticate_active_admin_user!
    authenticate_user!
    unless current_user.admin?
      reset_session
      redirect_to '/admin/login', :alert => "Unauthorized Access!"
    end
  end

  def fallback_index_html
    render :file => 'public/index.html'
  end

  # def after_sign_in_path_for(user)
  #   if current_user.admin?
  #     admin_dashboard_path
  #   end 
  # end`
  protected

  def configure_permitted_parameters
   devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :email, :password, :password_confirmation])
   devise_parameter_sanitizer.permit(:sign_in, keys: [:login, :password, :password_confirmation])
   devise_parameter_sanitizer.permit(:account_update, keys: [:username, :email, :password, :password_confirmation, :current_password])
  end

  # # before any action happens, it will authenticate the user
  # before_action :authenticate_user!
  
  # Sample route that shows you what you want to see.
  # Note the existence of this in routes.rb as well as the view in views/application/corgi.html.erb

end
