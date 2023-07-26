migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rnsfrqrsrmr5gx2")

  collection.options = {
    "query": "SELECT u.first AS user_name,\n       e.category,\n       e.semester,\n       u.id,\n       SUM(e.value) AS points\nFROM events e\nJOIN users u ON e.attendees LIKE '%' || u.id || '%'\nGROUP BY u.first, e.category, e.semester;"
  }

  // remove
  collection.schema.removeField("wg0ni75n")

  // remove
  collection.schema.removeField("u4veu7aj")

  // remove
  collection.schema.removeField("xlicnegf")

  // remove
  collection.schema.removeField("wh0lgk1l")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rnsfrqrsrmr5gx2")

  collection.options = {
    "query": "SELECT u.first AS user_name,\n       e.category,\n       e.semester,\n       u.id,\n       SUM(e.value) AS total_points\nFROM events e\nJOIN users u ON e.attendees LIKE '%' || u.id || '%'\nGROUP BY u.first, e.category, e.semester;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wg0ni75n",
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
    "id": "u4veu7aj",
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
    "id": "xlicnegf",
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
    "id": "wh0lgk1l",
    "name": "total_points",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("rtbngolr")

  // remove
  collection.schema.removeField("gj2l79wj")

  // remove
  collection.schema.removeField("wjb9ivsh")

  // remove
  collection.schema.removeField("irb14szn")

  return dao.saveCollection(collection)
})
