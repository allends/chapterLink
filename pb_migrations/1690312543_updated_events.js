migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lle9glmt865f4a5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xd5n5m7q",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lle9glmt865f4a5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xd5n5m7q",
    "name": "semester",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Fall 2023",
        "Spring 2024",
        "Fall 2023"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
