migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c94ljs028tpyo3h")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c94ljs028tpyo3h")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
