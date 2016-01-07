!SLIDE center
# ElasticSearch #
![ElasticSearch](elastic.png)

!SLIDE
# Overview #

* ElasticSearch is an open-source distributed document-store used for search and analytics
* Runs on the JVM
* Interfaces through a RESTful API
* Stores JSON data

!SLIDE
# Common uses: #

* Full-text search
* Structured and complex searching (e.g. geolocation search, fuzzy search)
* Analytics
* Operating alongside a standard database

!SLIDE
# Used by: #

* GitHub
* Wikipedia
* StackOverflow
* Kickstarter
* pretty much everyone..

!SLIDE
# Limitations #

* Data is available "near real-time" and indexing can be slower than SQL
* Possible for to lose writes
* Doesn’t support transaction
* No authentication or security features
* Data duplication

!SLIDE
# Data Process: #

* Mapping
* Indexing
* QueryDSL

!SLIDE
# Mapping #

* The "Schema" used by ElasticSearch (technically schema-less).
* Can either be explicitly defined before indexing
* Or inferred automatically when the documents are index

!SLIDE small
# Mapping #

`GET` to `http://localhost:9200/{index}/_mapping`

	@@@ json
	"mappings": {
		"email": {
			"properties": {
				"body": {
					"type": "string"
				},
				"sender": {
					"type": "string"
				},
			}
		}
	}


!SLIDE
# Indexing #

* Indexing corresponds to both "Create" and "Update" actions
* If document doesn't exist > create
* If document with same id already exists > replace with new version

!SLIDE
# QueryDSL #

* Interfaces with ElasticSearch through proprietary querying language
* No obvious analogies to SQL
* Well documented and highly customizable
* Plenty of clients (js, php, python, etc.)

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
# Update #
`PUT` to `http://localhost:9200/{index}/{resource}/{id}`

	@@@ json
	{
		"sender": "walter@fuzz.com",
		"subject": "Fuzz Updated",
		"body": "buttery croissant"
	}


!SLIDE small
# Retrieve & Delete #
`GET` or `DELETE` to `http://localhost:9200/{index}/{resource}/{id}`

	@@@ json
	"_index": "enron",
	"_type": "email",
	"_id": "63",
	"_version": 1,
	"found": true,
	"_source": {
		"sender": "shari.stack@enron.com",
		"subject": "CAISO Counterparties",
		"body": "Bob and Jeff"
	}

!SLIDE
# Simple Search #
`POST` to `http://localhost:9200/{index}/{resource}/_search`

	@@@ json
	{
		"query" : {
			"match" : {
				"_all" : "croissant"
			}
		}
	}

!SLIDE
# Field Search #
`POST` to `http://localhost:9200/{index}/{resource}/_search`

	@@@ json
	{
		"query" : {
			"match" : {
				"subject" : "Fuzz"
			}
		}
	}

!SLIDE
# Aggregations #
`POST` to `http://localhost:9200/{index}/{resource}/_search`

	@@@ json
	{
		"aggs" : {
			"avg_grade" : {
				"avg" : {
					"field" : "grade"
				}
			}
		}
	}

!SLIDE small
# Suggesters Search #
`POST` to `http://localhost:9200/{index}/{resource}/_suggest`

	@@@ json
	{
		sender_autocomplete_options" : {
			"text" : "wal",
			"completion" : {
				"field" : "sender_suggest",
				"fuzzy" : {
					"fuzziness" : 2
				}
			}
		}
	}

!SLIDE
# Demo #
