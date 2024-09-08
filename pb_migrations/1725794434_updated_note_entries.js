/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8t0c3srriin3rd3")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bsyx2r1d",
    "name": "category",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "WORK",
        "HEALTH",
        "RELATIONSHIPS"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8t0c3srriin3rd3")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bsyx2r1d",
    "name": "category",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "A",
        "B",
        "C"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
