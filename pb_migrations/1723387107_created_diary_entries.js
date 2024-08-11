/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "t5v105j16m3xef8",
    "created": "2024-08-11 14:38:27.109Z",
    "updated": "2024-08-11 14:38:27.109Z",
    "name": "diary_entries",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jyrpnzrf",
        "name": "date",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "robrxke2",
        "name": "sliderValues",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      },
      {
        "system": false,
        "id": "s1ffxnba",
        "name": "textValues",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
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
  const collection = dao.findCollectionByNameOrId("t5v105j16m3xef8");

  return dao.deleteCollection(collection);
})
