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
    @pagy, @words = pagy(Word.where(lang: 'volapuk')
                             .where("word ILIKE ?", "%#{@query}%")
                             .includes(:translations, :examples)
                             .order(:word))
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
