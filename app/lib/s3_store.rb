class S3Store
  BUCKET = ENV["BUCKET_NAME"].freeze

  def initialize file
    @file = file
    @s3 = AWS::S3.new
    @bucket = @s3.buckets[BUCKET]
  end

  def store
    @obj = @bucket.objects[filename].write(@file.tempfile, acl: :public_read)
    self
  end

  def url
    @obj.public_url.to_s
  end

  private
  
  def filename
    @filename ||= @file.original_filename.gsub(/[^a-zA-Z0-9_\.]/, '_')
  end
end