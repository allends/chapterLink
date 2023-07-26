migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rnsfrqrsrmr5gx2")

  collection.name = "points"

  // remove
  collection.schema.removeField("rtbngolr")

  // remove
  collection.schema.removeField("gj2l79wj")

  // remove
  collection.schema.removeField("wjb9ivsh")

  // remove
  collection.schema.removeField("irb14szn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "212xpxkv",
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
    "id": "vxjgre70",
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
    "id": "p4mrxoja",
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
    "id": "pv3ocrhf",
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

  collection.name = "test"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rtbngolr",
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
    "id": "gj2l79wj",
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
    "id": "wjb9ivsh",
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
    "id": "irb14szn",
    "name": "points",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("212xpxkv")

  // remove
  collection.schema.removeField("vxjgre70")

  // remove
  collection.schema.removeField("p4mrxoja")

  // remove
  collection.schema.removeField("pv3ocrhf")

  return dao.saveCollection(collection)
})
