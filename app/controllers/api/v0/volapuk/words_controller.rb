class Api::V0::Volapuk::WordsController < Api::BaseController
  before_action :set_word, only: [:show, :update]

  def index
    @words = Word.includes(:translations, :examples).where(lang: 'volapuk')
    render json: @words
  end

  def by_letter
    @words = Word.includes(:translations, :examples)
                .where(lang: 'volapuk', letter: params[:letter].downcase)
    render json: @words
  end

  def show
    render json: @word
  end

  def create
    @word = Word.new(word_params.merge(lang: 'volapuk'))
    if @word.save
      render json: @word, status: :created
    else
      render json: @word.errors, status: :unprocessable_entity
    end
  end

  def update
    if @word.update(word_params)
      render json: @word
    else
      render json: @word.errors, status: :unprocessable_entity
    end
  end

  def by_root
    @words = Word.where("roots LIKE ?", "%#{params[:root]}%").where(lang: 'volapuk')
    render json: @words
  end

  def by_letter
    @words = Word.where("letter LIKE ?", "%#{params[:letter]}%").where(lang: 'volapuk')
    render json: @words
  end

  private

  def set_word
    @word = Word.find(params[:id])
  end

  def word_params
    params.require(:word).permit(
      :lang, :word, :letter, :category, # Simple symbols first
      roots: [],                         # Array-type parameters next
      translations_attributes: [:id, :lang, :text, :_destroy], # Nested attributes last
      examples_attributes: [:id, :lang, :text, :_destroy]
    )
  end
end
