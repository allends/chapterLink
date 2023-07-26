migrate((db) => {
  const collection = new Collection({
    "id": "c94ljs028tpyo3h",
    "created": "2023-07-25 19:14:28.418Z",
    "updated": "2023-07-25 19:14:28.418Z",
    "name": "semester",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ayehafds",
        "name": "semester",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "Fall 2023",
            "Spring 2024",
            "Fall 2023"
          ]
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
      "query": "SELECT DISTINCT semester, (ROW_NUMBER() OVER()) as id from events;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("c94ljs028tpyo3h");

  return dao.deleteCollection(collection);
})
