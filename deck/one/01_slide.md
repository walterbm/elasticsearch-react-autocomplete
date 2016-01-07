!SLIDE
# ElasticSearch #

!SLIDE bullets incremental
# Bullet Points #

* first point
* second point
* third point

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
