/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t5v105j16m3xef8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "swe0rd1f",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t5v105j16m3xef8")

  // remove
  collection.schema.removeField("swe0rd1f")

  return dao.saveCollection(collection)
})
