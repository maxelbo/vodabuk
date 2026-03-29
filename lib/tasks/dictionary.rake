namespace :dictionary do
  desc "Check for duplicate words in dictionaryData.json"
  task check_dupes: :environment do
    data = JSON.parse(File.read(Rails.root.join("db/data/dictionaryData.json")))
    dupes = data.group_by { |e| e["word"] }.select { |_, v| v.size > 1 }
    if dupes.empty?
      puts "Vöds telik nonik petuvons."
    else
      dupes.each { |word, entries| puts "#{word} (#{entries.size}x)" }
    end
  end

  desc "Wipe all dictionary data and reseed from JSON"
  task reseed: :environment do
    puts "Kulöl tabis vödabuka..."
    Example.delete_all
    Translation.delete_all
    Word.delete_all
    puts "Finö! Gesidöl..."
    Rake::Task["db:seed"].invoke
  end
end
