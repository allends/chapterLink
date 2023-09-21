migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6p2qv8t3a2ov9iw")

  collection.listRule = "user.id = @request.auth.id || @request.auth.permissions ~ 'events'"
  collection.deleteRule = "user.id = @request.auth.id || @request.auth.permissions ~ 'events'"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6p2qv8t3a2ov9iw")

  collection.listRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
