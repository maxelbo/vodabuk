class WordsController < ApplicationController
  allow_unauthenticated_access only: [:index, :show, :search, :by_letter]
  before_action :set_word, only: [:show, :edit, :update, :destroy]

  def index
    @pagy, @words = pagy(Word.where(lang: 'volapuk')
                             .includes(:translations, :examples)
                             .order(Arel.sql("CASE WHEN word ~ '^[a-zA-ZäöüÄÖÜ]' THEN 0 ELSE 1 END, LOWER(word)")))
  end

  def search
    @query = params[:q].to_s.strip
    return @pagy, @words = pagy(Word.none) if @query.blank?

    lang_key = I18n.t("lang_key")
    normalized = @query.downcase.gsub(/[.,\/#!$%^&*;:{}=_`~()]/, "").squish

    scope = Word.where(lang: 'volapuk')
               .left_joins(:translations)
               .distinct
               .includes(:translations, :examples)
               .order(:word)

    # Volapük words: starts-with match
    volapuk_condition = "LOWER(words.word) LIKE :starts"

    # Translations: word starts-with match
    # Skip translation search for very short queries (1-2 chars) to avoid noise
    if normalized.length <= 2
      scope = scope.where(volapuk_condition, starts: "#{normalized}%")
    else
      escaped = Regexp.escape(normalized)
      translation_condition = "translations.text ~* :word_boundary"
      if lang_key == "volapuk"
        scope = scope.where("#{volapuk_condition} OR #{translation_condition}",
          starts: "#{normalized}%",
          word_boundary: "\\m#{escaped}")
      else
        scope = scope.where("#{volapuk_condition} OR (#{translation_condition} AND translations.lang = :lang)",
          starts: "#{normalized}%",
          word_boundary: "\\m#{escaped}", lang: lang_key)
      end
    end

    @pagy, @words = pagy(scope)
  end

  def by_letter
    @letter = params[:letter]
    @pagy, @words = pagy(Word.where(lang: 'volapuk', letter: @letter)
                             .includes(:translations, :examples)
                             .order(:word))
  end

  def show
  end

  def new
    @word = Word.new
    @word.translations.build
    @word.examples.build
  end

  def edit
    @word.translations.build if @word.translations.empty?
  end

  def create
    @word = Word.new(word_params.merge(lang: 'volapuk'))
    if @word.save
      log_activity("created", @word)
      redirect_to word_path(@word), notice: t("words.word_added")
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @word.update(word_params)
      log_activity("updated", @word)
      redirect_to word_path(@word), notice: t("words.word_updated")
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    log_activity("deleted", @word)
    @word.destroy!
    redirect_to words_path, notice: t("words.word_deleted")
  end

  private

  def set_word
    @word = Word.includes(:translations, :examples).find_by!(word: params[:id], lang: 'volapuk')
  end

  def log_activity(action, word)
    WordActivity.create!(
      user: Current.user,
      word: action == "deleted" ? nil : word,
      action: action,
      word_snapshot: word.word
    )
  end

  def word_params
    params.require(:word).permit(
      :word, :category, roots: [],
      translations_attributes: [:id, :lang, :text, :_destroy],
      examples_attributes: [:id, :lang, :text, :_destroy]
    )
  end
end
