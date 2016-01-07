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
    "This is the Sinatra ElasticSearch API"
  end

  # get '/:q' do
  #   params_query
  #   binding.pry
  #   "I get you records".to_json
  # end

  post '/search' do
    query = JSON.parse(request.body.read)

    es_result = @@client.search(
      index: 'enron',
      body: {
        query: {
          match: {
            body: query["query"]
          }
        }
      }
    )

    search_results = es_result["hits"]["hits"].map do |result|
      result["_source"]["subject"]
    end

    search_results.to_json
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

    autocomplete_options = sender_options + subject_options

    autocomplete_options.to_json
  end

  options '*' do
    200
  end

  private

    def params_query
      params.has_key?("q")? params[:q] : ''
    end

end
