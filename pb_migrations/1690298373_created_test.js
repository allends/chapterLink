migrate((db) => {
  const collection = new Collection({
    "id": "rnsfrqrsrmr5gx2",
    "created": "2023-07-25 15:19:33.322Z",
    "updated": "2023-07-25 15:19:33.322Z",
    "name": "test",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "oskudawg",
        "name": "attendees",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT e.attendees, e.id FROM events e;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("rnsfrqrsrmr5gx2");

  return dao.deleteCollection(collection);
})
