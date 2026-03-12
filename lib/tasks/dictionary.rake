namespace :dictionary do
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
