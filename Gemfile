source "https://rubygems.org"

ruby "3.3.0"

# Rails
gem "rails", "~> 7.1.3"

# Drivers
gem "pg", "~> 1.5"
gem "redis", ">= 4.0.1"

# Deployment
gem "puma", ">= 5.0"
gem "bootsnap", require: false

# Assets
gem "importmap-rails"
gem "propshaft"
gem "tailwindcss-rails"
gem "lucide-rails", github: "maybe-finance/lucide-rails"

# Hotwire
gem "stimulus-rails"
gem "turbo-rails"

# Other
gem "bcrypt", "~> 3.1.7"
gem "inline_svg"
gem "jbuilder"
gem "tzinfo-data", platforms: %i[windows jruby]
gem "money-rails", "~> 1.12"
gem "net-imap"
gem "devise"

gem "strong_migrations"

group :development, :test do
  gem "debug", platforms: %i[mri windows]
  gem "brakeman", require: false
  gem "rubocop-rails-omakase", require: false
  gem "dotenv-rails"
  gem "letter_opener"
  gem "i18n-tasks"
  gem "faker"
end

group :development do
  gem "web-console"
  gem "hotwire-livereload"
  gem "ruby-lsp-rails"
  gem "annotate"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end

gem "foreman", "~> 0.87.2"

gem "solargraph", "~> 0.50.0"
