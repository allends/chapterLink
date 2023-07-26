migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3s2l36ik5qiy87h");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "3s2l36ik5qiy87h",
    "created": "2023-07-25 01:07:03.309Z",
    "updated": "2023-07-25 01:07:03.309Z",
    "name": "semester",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ugqivvnu",
        "name": "term",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "Fall",
            "Spring"
          ]
        }
      },
      {
        "system": false,
        "id": "9pcyzsss",
        "name": "year",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
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
