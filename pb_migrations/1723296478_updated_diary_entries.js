/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nnagwhl69ld0r4v")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k0xsaqjj",
    "name": "date",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nnagwhl69ld0r4v")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
