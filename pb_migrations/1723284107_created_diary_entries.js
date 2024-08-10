/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "nnagwhl69ld0r4v",
    "created": "2024-08-10 10:01:47.550Z",
    "updated": "2024-08-10 10:01:47.550Z",
    "name": "diary_entries",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "na6tqrgq",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "k0xsaqjj",
        "name": "createdAt",
        "type": "date",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "cipu3aew",
        "name": "sliderValues",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 2,
          "values": [
            "[0",
            "1",
            "2",
            "3",
            "4",
            "5]"
          ]
        }
      },
      {
        "system": false,
        "id": "xkrbio9s",
        "name": "textValues",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 2,
          "values": [
            "[0",
            "1",
            "2",
            "3",
            "4",
            "5]"
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
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("nnagwhl69ld0r4v");

  return dao.deleteCollection(collection);
})
