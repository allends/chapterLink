migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rnsfrqrsrmr5gx2")

  collection.listRule = "id = @request.auth.id"
  collection.viewRule = "id = @request.auth.id"

  // remove
  collection.schema.removeField("q3bdlmji")

  // remove
  collection.schema.removeField("arsb3fug")

  // remove
  collection.schema.removeField("8lqtdz0l")

  // remove
  collection.schema.removeField("6jhdn4gw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "areewify",
    "name": "user_name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "smjnmgzc",
    "name": "category",
    "type": "select",
    "required": true,
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sbscvfxo",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qy61d0ux",
    "name": "points",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rnsfrqrsrmr5gx2")

  collection.listRule = null
  collection.viewRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q3bdlmji",
    "name": "user_name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "arsb3fug",
    "name": "category",
    "type": "select",
    "required": true,
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8lqtdz0l",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6jhdn4gw",
    "name": "points",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("areewify")

  // remove
  collection.schema.removeField("smjnmgzc")

  // remove
  collection.schema.removeField("sbscvfxo")

  // remove
  collection.schema.removeField("qy61d0ux")

  return dao.saveCollection(collection)
})
