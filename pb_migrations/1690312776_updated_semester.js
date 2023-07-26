migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c94ljs028tpyo3h")

  collection.options = {
    "query": "SELECT DISTINCT semester as id from events;"
  }

  // remove
  collection.schema.removeField("0elmorek")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c94ljs028tpyo3h")

  collection.options = {
    "query": "SELECT DISTINCT semester, semester as id from events;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0elmorek",
    "name": "semester",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Fall 2023",
        "Spring 2024",
        "Fall 2024"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
