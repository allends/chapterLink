migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lle9glmt865f4a5")

  // remove
  collection.schema.removeField("u6qdrekw")

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lle9glmt865f4a5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u6qdrekw",
    "name": "semester",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "3s2l36ik5qiy87h",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("xd5n5m7q")

  return dao.saveCollection(collection)
})
