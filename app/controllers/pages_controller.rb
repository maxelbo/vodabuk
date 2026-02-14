class PagesController < ApplicationController
  allow_unauthenticated_access

  def about
    @total_count = Word.where(lang: "volapuk").count
    @eo_count = Word.where(lang: "volapuk")
                    .joins(:translations)
                    .where(translations: { lang: "esperanto" })
                    .distinct
                    .count
  end
end
