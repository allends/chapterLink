migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lle9glmt865f4a5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ususr4vq",
    "name": "category",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Brotherhood",
        "Scholarship",
        "Professionalism",
        "Community Service",
        "Fundraising",
        "Pledge"
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
    "id": "ususr4vq",
    "name": "category",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Brotherhood",
        "Scholarship",
        "Professionalism",
        "Community Service",
        "Fundraising"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
