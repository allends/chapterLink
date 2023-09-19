migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6p2qv8t3a2ov9iw")

  collection.listRule = "user.id = @request.auth.id"
  collection.viewRule = "user.id = @request.auth.id"
  collection.createRule = "user.id = @request.auth.id"
  collection.updateRule = "user.id = @request.auth.id"
  collection.deleteRule = "user.id = @request.auth.id"
  collection.indexes = [
    "CREATE UNIQUE INDEX `cid` ON `attendence_requests` (\n  `user`,\n  `event`\n)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g2nyqotx",
    "name": "user",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zyrwp6fd",
    "name": "event",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "lle9glmt865f4a5",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6p2qv8t3a2ov9iw")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null
  collection.indexes = [
    "CREATE UNIQUE INDEX `cid` ON `attendence_requests` (\n  `uid`,\n  `eid`\n)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g2nyqotx",
    "name": "uid",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zyrwp6fd",
    "name": "eid",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "lle9glmt865f4a5",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
