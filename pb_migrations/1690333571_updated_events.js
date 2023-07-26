migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lle9glmt865f4a5")

  collection.listRule = "@request.auth.permissions ~ 'events'"
  collection.createRule = "@request.auth.permissions ~ 'events'"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lle9glmt865f4a5")

  collection.listRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
