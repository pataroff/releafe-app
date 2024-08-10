/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nnagwhl69ld0r4v")

  // remove
  collection.schema.removeField("cipu3aew")

  // remove
  collection.schema.removeField("xkrbio9s")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xki31wk0",
    "name": "sliderValues",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xsh8ogmq",
    "name": "textValues",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nnagwhl69ld0r4v")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("xki31wk0")

  // remove
  collection.schema.removeField("xsh8ogmq")

  return dao.saveCollection(collection)
})
