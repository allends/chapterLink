migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6p2qv8t3a2ov9iw")

  collection.createRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6p2qv8t3a2ov9iw")

  collection.createRule = null

  return dao.saveCollection(collection)
})
