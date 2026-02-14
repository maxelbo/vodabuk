require 'json'

# Create admin user
if ENV["ADMIN_EMAIL"].present? && ENV["ADMIN_PASSWORD"].present?
  User.find_or_create_by!(email_address: ENV["ADMIN_EMAIL"]) do |u|
    u.password = ENV["ADMIN_PASSWORD"]
    u.admin = true
    puts "Admin user created: #{ENV["ADMIN_EMAIL"]}"
  end
end

ActiveRecord::Base.transaction do
  file_path = Rails.root.join('db', 'data', 'dictionaryData.json')

  unless File.exist?(file_path)
    puts "Seed file not found at #{file_path}"
    next 
  end

  begin
    words_array = JSON.parse(File.read(file_path))
    total_count = words_array.size
    puts "Seeding Volapük Dictionary..."
  rescue JSON::ParserError => e
    puts "Error parsing JSON: #{e.message}"
    next
  end

  words_array.each_with_index do |data, index|
    next if data['word'].blank?

    # 1. Database Logic
    word = Word.find_or_create_by!(word: data['word'], lang: data['lang']) do |w|
      w.category = data['category']
      w.roots = data['roots'] || []
    end

    Array(data['translations']).each do |t|
      next if t['text'].blank?
      word.translations.find_or_create_by!(lang: t['lang'], text: t['text'])
    end

    Array(data['examples']).each do |e|
      next if e['text'].blank?
      word.examples.find_or_create_by!(lang: e['lang'], text: e['text'])
    end
    
    current = index + 1
    percent = (current.to_f / total_count * 100).to_i
    
    bar_width = 20
    filled = (percent.to_f / 100 * bar_width).to_i
    bar = "█" * filled + "░" * (bar_width - filled)

    display_word = data['word'].to_s[0..15]
    display_word += ".." if data['word'].to_s.length > 15

    # \r = Start of line
    # \e[2K = Clear line
    output = "\r\e[2K|#{bar}| #{percent}% (#{current}/#{total_count}) - #{display_word}"
    
    $stdout.write output
    $stdout.flush
  end
end

puts "\n\n Done! Sidnunäds sekaliegiko pälüükons!"