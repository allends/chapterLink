migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rnsfrqrsrmr5gx2")

  // remove
  collection.schema.removeField("areewify")

  // remove
  collection.schema.removeField("smjnmgzc")

  // remove
  collection.schema.removeField("sbscvfxo")

  // remove
  collection.schema.removeField("qy61d0ux")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8cxuvahw",
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
    "id": "pumug90b",
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
    "id": "ggd3dil8",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "prspidp6",
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

  // remove
  collection.schema.removeField("8cxuvahw")

  // remove
  collection.schema.removeField("pumug90b")

  // remove
  collection.schema.removeField("ggd3dil8")

  // remove
  collection.schema.removeField("prspidp6")

  return dao.saveCollection(collection)
})
