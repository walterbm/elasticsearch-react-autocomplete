require_relative 'config/environment'

class ElasticSearchApp < Sinatra::Base
  @@client = Elasticsearch::Client.new(log: true)
  @@client.transport.reload_connections!
  @@client.cluster.health

  set :server, :thin

  get '/' do
    @@client.indices.refresh(index: 'enron')

    result = @@client.search(
      index: 'enron',
      body: {
        query: {
          match: {
            title: params_query
          }
        }
      }
    )
    result.to_json
  end

  post '/' do
    @@client.index(
      index: 'enron',
      type: 'my-document',
      id: 1,
      body: {
        title: params_doc
      }
    )
    "worked"
  end

  private

    def params_query
      params.has_key?("q")? params[:q] : ''
    end

    def params_doc
      params[:content]
    end

end
