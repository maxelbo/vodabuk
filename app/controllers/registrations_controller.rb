class RegistrationsController < ApplicationController
  before_action :require_admin

  def index
    @users = User.order(:email_address)
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(registration_params)
    if @user.save
      redirect_to registrations_path, notice: t("auth.user_created")
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user == Current.user
      redirect_to registrations_path, alert: t("auth.cannot_delete_self")
    else
      @user.destroy!
      redirect_to registrations_path, notice: t("auth.user_deleted")
    end
  end

  private

  def require_admin
    redirect_to root_path, alert: t("auth.not_authorized") unless Current.user&.admin?
  end

  def registration_params
    params.require(:user).permit(:email_address, :password, :password_confirmation)
  end
end
