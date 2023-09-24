migrate((db) => {
  const collection = new Collection({
    "id": "80pgy70y303sex5",
    "created": "2023-09-24 03:24:13.461Z",
    "updated": "2023-09-24 03:24:13.461Z",
    "name": "institution",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lpqfvgse",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "svanlkac",
        "name": "location",
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
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("80pgy70y303sex5");

  return dao.deleteCollection(collection);
})
