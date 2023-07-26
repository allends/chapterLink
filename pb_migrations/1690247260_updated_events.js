migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lle9glmt865f4a5")

  // update
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lle9glmt865f4a5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u6qdrekw",
    "name": "semester",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "3s2l36ik5qiy87h",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
