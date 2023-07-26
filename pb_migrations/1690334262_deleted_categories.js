migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("tcmykzoda9wk75c");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "tcmykzoda9wk75c",
    "created": "2023-07-26 01:17:24.311Z",
    "updated": "2023-07-26 01:17:24.311Z",
    "name": "categories",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lyzsvk8j",
        "name": "field",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
})
