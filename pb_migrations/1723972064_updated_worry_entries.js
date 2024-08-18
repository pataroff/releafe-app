/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("shxc9icizstcx9x")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pgalpapv",
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
  const collection = dao.findCollectionByNameOrId("shxc9icizstcx9x")

  // remove
  collection.schema.removeField("pgalpapv")

  return dao.saveCollection(collection)
})
