# config/initializers/s3.rb
AWS.config(
  :access_key_id => ENV['AWS_ACCESS_KEY'],
  :secret_access_key => ENV['AWS_SECRET_KEY']
)