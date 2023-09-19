migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6p2qv8t3a2ov9iw")

  collection.listRule = "uid.id = @request.auth.id"
  collection.viewRule = "uid.id = @request.auth.id"
  collection.createRule = "uid.id = @request.auth.id"
  collection.updateRule = "uid.id = @request.auth.id"
  collection.deleteRule = "uid.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6p2qv8t3a2ov9iw")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
