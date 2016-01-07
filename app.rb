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
            'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST','HEAD','GET','PUT','DELETE'],
            'Access-Control-Allow-Headers' => 'Content-Type'
  end

  get '/' do
    @@client.indices.refresh(index: 'enron')
    "I'm the API"
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

  get '/:id' do
    @@client.indices.refresh(index: 'enron')
    "I get you records"
  end

  post '/auto' do
    autocomplete = JSON.parse(request.body.read)

    es_result = @@client.suggest(
      index: 'enron',
      body: {
        sender: {
          text: autocomplete["query"],
          completion: {
            field: "sender_suggest"
          }
        },
        subject: {
          text: autocomplete["query"],
          completion: {
            field: "subject_suggest",
            fuzzy: {
              fuzziness: 2
            }
          }
        }
      }
    )
    
    sender_options = es_result["sender"].first["options"].map do |option|
      option["text"]
    end

    subject_options = es_result["subject"].first["options"].map do |option|
      option["text"]
    end

    options = sender_options + subject_options

    options.to_json
  end

  options '*' do
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
