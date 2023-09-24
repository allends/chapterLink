migrate((db) => {
  const collection = new Collection({
    "id": "rc8yezz9mukwwix",
    "created": "2023-09-24 03:29:06.100Z",
    "updated": "2023-09-24 03:29:06.100Z",
    "name": "organization_requests",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "svvfvjct",
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
      },
      {
        "system": false,
        "id": "aira46jl",
        "name": "organization",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "v2phcwf1gx13cwk",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
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
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("rc8yezz9mukwwix");

  return dao.deleteCollection(collection);
})
