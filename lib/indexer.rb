require_relative '../config/environment'

class DocumentIndexer

  def initialize
    begin
      @elastic_client = Elasticsearch::Client.new(log: true)

      @mysql_client = Mysql2::Client.new(host: ENV['HOST'], username: ENV['USERNAME'], password: ENV['PASSWORD'], database: 'enron')

      clear_elastic_index
      create_elastic_index_and_mappings
      upload_mysql_rows
    rescue Exception => e
      puts e.errno
      puts e.error
    ensure
      @mysql_client.close if @mysql_client
    end
  end

  def upload_mysql_rows
    @mysql_client.query("SELECT * FROM message LIMIT 200000").each do |row|
      @elastic_client.index(
        index: 'enron',
        type: 'email',
        id: row["mid"],
        body: {
          sender: row["sender"],
          subject: row["subject"],
          body: row["body"],
          subject_suggest: {
            input: [row["subject"]],
            payload: {email_id: row["mid"]}
          },
          sender_suggest: {
            input: [row["sender"]],
            payload: {email_id: row["mid"]}
          },
        }
      )
    end
  end

  def clear_elastic_index
    if @elastic_client.indices.exists?(index: 'enron')
      @elastic_client.indices.delete(index: 'enron')
    end
  end

  def create_elastic_index_and_mappings
    @elastic_client.indices.create(
      index: 'enron',
      body: {
        mappings: {
          email: {
            properties: {
              sender: {type: "string"},
              subject: {type: "string"},
              body: {type: "string"},
              subject_suggest: {
                type: "completion",
                analyzer: "standard",
                search_analyzer: "standard",
                preserve_position_increments: false,
                preserve_separators: false,
                payloads: true,
              },
              sender_suggest: {
                type: "completion",
                analyzer: "standard",
                search_analyzer: "standard",
                preserve_position_increments: false,
                preserve_separators: false,
                payloads: true,
              }
            }
          }
        }
      }
    )
  end
end

DocumentIndexer.new
