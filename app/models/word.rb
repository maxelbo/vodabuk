class Word < ApplicationRecord
  ALPHABET = %w(a ä b c d e f g h i j k l m n o ö p r s t u ü v x y z).freeze
  
  has_many :translations, dependent: :destroy
  has_many :examples, dependent: :destroy

  accepts_nested_attributes_for :translations, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :examples, allow_destroy: true, reject_if: :all_blank

  validates :lang, presence: true
  validates :word, presence: true, uniqueness: { scope: :lang }
  validates :category, presence: true

  before_save :set_letter

  def to_param
    word
  end

  serialize :roots, coder: JSON

  def display_word
    word.to_s.strip.upcase_first
  end

  def display_category
    category.to_s.strip.upcase_first
  end

  def translations_for(lang_key)
    if lang_key.to_s == "volapuk"
      grouped = translations.select { |t| %w[english esperanto].include?(t.lang) }
                            .group_by(&:lang)
      parts = []
      %w[english esperanto].each do |lang|
        next unless grouped[lang]&.any?
        label = lang == "english" ? "Linglänik" : "Sperantik"
        text = grouped[lang].map(&:text).join(", ").upcase_first
        parts << { label: label, text: text }
      end
      parts
    else
      text = translations.select { |t| t.lang == lang_key.to_s }.map(&:text).join(", ")
      text.upcase_first
    end
  end

  def examples_for(lang_key)
    examples.select { |e| e.lang == lang_key.to_s }
  end

  def as_json(options = {})
    json = super(options.merge(only: [:word, :roots, :lang, :letter, :category], include: {
      translations: { only: [:lang, :text] },
      examples: { only: [:lang, :text] },
    }))
    
    # As empty arrays, instead of Null
    json['roots'] ||= []
    json['examples'] ||= []

    json
  end

  def self.alphabet
    ALPHABET
  end

  private

  def set_letter
    self.letter = word[0].downcase if word.present?
  end
end
