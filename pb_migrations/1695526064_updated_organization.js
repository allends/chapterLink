migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v2phcwf1gx13cwk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "08edn8y2",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v2phcwf1gx13cwk")

  // remove
  collection.schema.removeField("08edn8y2")

  return dao.saveCollection(collection)
})
