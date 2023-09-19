migrate((db) => {
  const collection = new Collection({
    "id": "6p2qv8t3a2ov9iw",
    "created": "2023-09-19 03:07:13.565Z",
    "updated": "2023-09-19 03:07:13.565Z",
    "name": "attendence_requests",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "g2nyqotx",
        "name": "uid",
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
        "id": "zyrwp6fd",
        "name": "eid",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "lle9glmt865f4a5",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `cid` ON `attendence_requests` (\n  `uid`,\n  `eid`\n)"
    ],
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
  const collection = dao.findCollectionByNameOrId("6p2qv8t3a2ov9iw");

  return dao.deleteCollection(collection);
})
