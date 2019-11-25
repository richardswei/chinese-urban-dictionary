class UserTokenController < Knock::AuthTokenController
  skip_before_action :verify_authenticity_token
  
  private
    def auth_params
        params.require(:auth).permit(:email, :password)
    end
end
