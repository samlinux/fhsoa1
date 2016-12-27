define({ "api": [  {    "type": "delete",    "url": "/",    "title": "Delete an existing dataset",    "examples": [      {        "title": "Example usage:",        "content": "curl -X PULL -d '{\"id\":\"-KZv9td4RRj4iui0HvtZ\"} \\\n-i http://localhost:3000 \"Content-Type: application/json\"",        "type": "curl"      }    ],    "group": "climate",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>Id to delete</p>"          }        ]      }    },    "description": "<p>Delete an exiting dataset</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "key",            "description": "<p>Id from the new dataset</p>"          }        ]      },      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 200 OK\n{true}",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Error",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./server.js",    "groupTitle": "climate",    "name": "Delete"  },  {    "type": "get",    "url": "/",    "title": "Get all datasets",    "examples": [      {        "title": "Example usage:",        "content": "curl -i http://localhost:3000",        "type": "curl"      }    ],    "group": "climate",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Array[]",            "optional": false,            "field": "data",            "description": "<p>includes all datasets as objects</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "climate",            "description": "<p>Climate object</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "climate.timestamp",            "description": "<p>date and time of the dataset</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "climate.temperature",            "description": "<p>measured temperature</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "climate.humidity",            "description": "<p>measured humidity</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "\tHTTP/1.1 200 OK\n\t\"data\": [\n\t\t{\n\t\t\t\"id\":\"-KYthvj98TpxEPdIpFWW\",\n\t\t\t\"timestamp\": \"2016-12-26 12:20:20\",\n\t\t\t\"temperature\": 12,\n\t\t\t\"humidity\": 55\n  \t\t}\n\t]",          "type": "json"        }      ]    },    "description": "<p>Provides all climate information from the firebase database</p>",    "version": "0.0.0",    "filename": "./server.js",    "groupTitle": "climate",    "name": "Get"  },  {    "type": "get",    "url": "/:id",    "title": "Get one specific dataset",    "examples": [      {        "title": "Example usage:",        "content": "curl -X GET -i http://localhost:3000/-KZvAMz9zE4e78U4D7bK -H \"Content-Type: application/json\"",        "type": "curl"      }    ],    "group": "climate",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "data",            "description": "<p>includes the climate data</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "climate",            "description": "<p>Object</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "climate.timestamp",            "description": "<p>date and time of the dataset</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "climate.temperature",            "description": "<p>measured temperature</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "climate.humidity",            "description": "<p>measured humidity</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "\tHTTP/1.1 200 OK\n\t\"data\":{\n\t\t\"id\":\"-KYthvj98TpxEPdIpFWW\",\n\t\t\"timestamp\": \"2016-12-26 12:20:20\",\n\t\t\"temperature\": 12,\n\t\t\"humidity\": 55\n  \t}",          "type": "json"        }      ]    },    "description": "<p>Provides all climate information from a requested dataset ID</p>",    "version": "0.0.0",    "filename": "./server.js",    "groupTitle": "climate",    "name": "GetId"  },  {    "type": "get",    "url": "/info",    "title": "Check if API is accessible",    "examples": [      {        "title": "Example usage:",        "content": "curl -i http://localhost:3000/info",        "type": "curl"      }    ],    "group": "climate",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "version",            "description": ""          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n\"version\": 1",          "type": "json"        }      ]    },    "description": "<p>Provides a version number as symbole the api is accessible</p>",    "version": "0.0.0",    "filename": "./server.js",    "groupTitle": "climate",    "name": "GetInfo"  },  {    "type": "patch",    "url": "/",    "title": "Patch an existing dataset",    "examples": [      {        "title": "Example usage:",        "content": "curl -X PATCH -d '{\"id\":\"-KZv9td4RRj4iui0HvtZ\",\"data\":{\"temperature\":100}}' \\\n-i http://localhost:3000 -H \"Content-Type: application/json\"",        "type": "curl"      }    ],    "group": "climate",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>Id to patch</p>"          },          {            "group": "Parameter",            "type": "Object",            "optional": false,            "field": "data",            "description": "<p>data to patch</p>"          },          {            "group": "Parameter",            "type": "Double",            "optional": false,            "field": "data.temperature",            "description": "<p>temperature to patch</p>"          },          {            "group": "Parameter",            "type": "Double",            "optional": false,            "field": "data.humidity",            "description": "<p>humidity to patch</p>"          },          {            "group": "Parameter",            "type": "Date",            "optional": false,            "field": "data.timestampe",            "description": "<p>date to patch (format to use: YYYY-MM-DD HH:MM:SS)</p>"          }        ]      }    },    "description": "<p>Patches a climate dataset, the dataset will be supplemented with the given data</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "key",            "description": "<p>Id from the new dataset</p>"          }        ]      },      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 200 OK\n{true}",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Error",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./server.js",    "groupTitle": "climate",    "name": "Patch"  },  {    "type": "post",    "url": "/",    "title": "Store a new dataset",    "examples": [      {        "title": "Example usage:",        "content": "curl -X POST -d '{\"temperature\":23,\"humidity\":40}' \\\n-i http://localhost:3000 -H 'Content-Type: application/json'",        "type": "curl"      }    ],    "group": "climate",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Double",            "optional": false,            "field": "temperature",            "description": "<p>current temperature</p>"          },          {            "group": "Parameter",            "type": "Double",            "optional": false,            "field": "humidity",            "description": "<p>current humidity</p>"          },          {            "group": "Parameter",            "type": "Date",            "optional": false,            "field": "timestampe",            "description": "<p>current date and time (format to use: YYYY-MM-DD HH:MM:SS)</p>"          }        ]      }    },    "description": "<p>stores a new climate dataset</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "key",            "description": "<p>Id from the new dataset</p>"          }        ]      },      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 200 OK\n{key:\"-KZvh5h74KfMzevytDQ0\"}",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Error",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./server.js",    "groupTitle": "climate",    "name": "Post"  },  {    "type": "pull",    "url": "/",    "title": "Pull an existing dataset",    "examples": [      {        "title": "Example usage:",        "content": "curl -X PULL -d '{\"id\":\"-KZv9td4RRj4iui0HvtZ\",\"data\":{\"temperature\":100}}' \\\n-i http://localhost:3000 -H \"Content-Type: application/json\"",        "type": "curl"      }    ],    "group": "climate",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>Id to patch</p>"          },          {            "group": "Parameter",            "type": "Object",            "optional": false,            "field": "data",            "description": "<p>data to patch</p>"          },          {            "group": "Parameter",            "type": "Double",            "optional": false,            "field": "data.temperature",            "description": "<p>temperature to patch</p>"          },          {            "group": "Parameter",            "type": "Double",            "optional": false,            "field": "data.humidity",            "description": "<p>humidity to patch</p>"          },          {            "group": "Parameter",            "type": "Date",            "optional": false,            "field": "data.timestampe",            "description": "<p>date to patch (format to use: YYYY-MM-DD HH:MM:SS)</p>"          }        ]      }    },    "description": "<p>Pull or update an exiting dataset, the dataset will be rewritten with the given information</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "key",            "description": "<p>Id from the new dataset</p>"          }        ]      },      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 200 OK\n{true}",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Error",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./server.js",    "groupTitle": "climate",    "name": "Pull"  }] });
