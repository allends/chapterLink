migrate((db) => {
  const collection = new Collection({
    "id": "v2phcwf1gx13cwk",
    "created": "2023-09-24 03:26:02.294Z",
    "updated": "2023-09-24 03:26:02.294Z",
    "name": "organization",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "erx45ltd",
        "name": "belongs",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "80pgy70y303sex5",
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
  const collection = dao.findCollectionByNameOrId("v2phcwf1gx13cwk");

  return dao.deleteCollection(collection);
})
