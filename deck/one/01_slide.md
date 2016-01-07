!SLIDE
# ElasticSearch #

!SLIDE
ElasticSearch is a real-time distributed search and analytics document-store and engine.

Runs on the JVM

Interact Through a RESTful API

!SLIDE bullets
# Common uses for ElasticSearch #

* full-text search
* structured search (e.g. coordinate search)
* analytics

!SLIDE bullets
# Used by: #

* GitHub
* Wikipedia
* The Guardian
* Kickstarter

!SLIDE bullets
# Process #

* Mapping
* Indexing
* QueryDSL

!SLIDE
.notes notes for my slide

	@@@ ruby
    result = client.suggest(
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


!SLIDE
.notes notes for my slide

	@@@ javascript handleQueryChange(e){
    this.setState({
      query: e.target.value
    });
  }
