/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t5v105j16m3xef8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yjdqvjaa",
    "name": "uuid",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t5v105j16m3xef8")

  // remove
  collection.schema.removeField("yjdqvjaa")

  return dao.saveCollection(collection)
})
