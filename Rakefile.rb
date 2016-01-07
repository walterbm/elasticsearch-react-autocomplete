require 'fileutils'

task :index do
  ruby "lib/indexer.rb"
end

task :deck do
  `cd deck && showoff serve -p 3000`
end
