class ApplicationController < ActionController::Base
  include Authentication
  include Pagy::Backend

  around_action :switch_locale

  private

  def switch_locale(&action)
    if params[:locale].present? && I18n.available_locales.map(&:to_s).include?(params[:locale])
      cookies[:locale] = params[:locale]
    end

    locale = cookies[:locale]
    locale = I18n.default_locale unless I18n.available_locales.map(&:to_s).include?(locale)
    I18n.with_locale(locale, &action)
  end

  def default_url_options
    { locale: I18n.locale == I18n.default_locale ? nil : I18n.locale }
  end
end
