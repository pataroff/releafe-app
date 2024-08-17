/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("shxc9icizstcx9x")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oouveuen",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fbqr75nv",
    "name": "priority",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "NONE",
        "LOW",
        "MEDIUM",
        "HIGH"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("shxc9icizstcx9x")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oouveuen",
    "name": "category",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Work",
        "Health",
        "Relationships"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fbqr75nv",
    "name": "priority",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "None",
        "Low",
        "Medium",
        "High"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
