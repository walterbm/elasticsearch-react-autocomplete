require_relative 'config/environment'

class MySQLUploader

  def initialize

  end

  def test_connection
    begin
      client = Mysql2::Client.new(host: ENV['host'], username: ENV['username'], password: ENV['password'])
      puts client.server_info
      response = client.query('SELECT VERSION()')
      puts response.first
    rescue Mysql2::Error => e
      puts e.errno
      puts e.error
    ensure
      client.close if client
    end
  end

end

test = MySQLUploader.new
test.test_connection
