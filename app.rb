require_relative 'config/environment'

class ElasticSearchApp < Sinatra::Base
  @@client = Elasticsearch::Client.new(log: true)
  @@client.transport.reload_connections!
  @@client.cluster.health

  set :server, :thin
  set :protection, false

  before do
    content_type :json
    headers 'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
            'Access-Control-Allow-Headers' => 'Content-Type'
  end

  get '/' do
    @@client.indices.refresh(index: 'enron')
    'wait'
    # result = @@client.search(
    #   index: 'enron',
    #   body: {
    #     query: {
    #       match: {
    #         body: params_query
    #       }
    #     }
    #   }
    # )
    # result.to_json
  end

  post '/' do
    query = JSON.parse(request.body.read)
    "worked".to_json
  end

  post '/auto' do
    # autocomplete = JSON.parse(request.body.read)
    result = @@client.suggest(
      index: 'enron',
      body: {
        autocomplete_suggest: {
          text: 'enr',
          completion: {
            field: "sender_suggest"
          }
        }
      }
    )
    result.to_json
  end

  options '/*' do
    200
  end

  private

    def params_query
      params.has_key?("q")? params[:q] : ''
    end

    def params_doc
      params[:content]
    end

end
