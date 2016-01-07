!SLIDE center
# ElasticSearch #
![ElasticSearch](http://assets.wildbit.com/postmark/blog/images/logo-elastic.png)

!SLIDE bullets
# Overview #

* ElasticSearch is a real-time distributed document-store, search, and analytics engine.
* Runs on the JVM
* Interfaces through a RESTful API
* JSON data

!SLIDE bullets
# Common uses: #

* full-text search
* structured search (e.g. geolocation search)
* analytics

!SLIDE bullets
# Used by: #

* GitHub
* Wikipedia
* The Guardian
* Kickstarter

!SLIDE bullets
# Process: #

* Mapping
* Indexing
* QueryDSL

!SLIDE
# Mapping #

The "schema" used by ElasticSearch.

Can either be created before indexing (similar to migrations)
Or inferred automatically when the first document is index

!SLIDE
# QueryDSL #

Interfaces with ElasticSearch through their own proprietary querying language

!SLIDE
# Create #
`POST` to `http://localhost:9200/{index}/{resource}`

	@@@ json
	{
		"sender": "walter@fuzz.com",
		"subject": "Fuzz Demo",
		"body": "croissant"
	}

!SLIDE
# Retrieve #
`GET` to `http://localhost:9200/{index}/{resource}/{id}`

!SLIDE
# Update #
`PUT` to `http://localhost:9200/{index}/{resource}/{id}`

	@@@ json
	{
		"sender": "walter@fuzz.com",
		"subject": "Fuzz Updated",
		"body": "buttery croissant"
	}

!SLIDE
# Demo #
