ruby '2.0.0'
source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'jekyll'
gem 'jekyll-redirect-from'

gem 'nokogiri'
gem 'redcarpet'
gem 'pygments.rb'

gem 'github-pages', versions['github-pages']
