# Bytedance Seedream v4

> A new-generation image creation model ByteDance, Seedream 4.0 integrates image generation and image editing capabilities into a single, unified architecture.


## Overview

- **Endpoint**: `https://fal.run/fal-ai/bytedance/seedream/v4/text-to-image`
- **Model ID**: `fal-ai/bytedance/seedream/v4/text-to-image`
- **Category**: text-to-image
- **Kind**: inference
**Tags**: stylized, transform



## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.


### Input Schema

The API accepts the following input parameters:


- **`prompt`** (`string`, _required_):
  The text prompt used to generate the image
  - Examples: "A trendy restaurant with a digital menu board displaying \"Seedream 4.0 is available on fal\" in elegant script, with diners enjoying their meals."

- **`image_size`** (`ImageSize | Enum`, _optional_):
  The size of the generated image. Width and height must be between 1024 and 4096.
  - Default: `{"height":2048,"width":2048}`
  - One of: ImageSize | Enum
  - Examples: {"height":4096,"width":4096}

- **`num_images`** (`integer`, _optional_):
  Number of separate model generations to be run with the prompt. Default value: `1`
  - Default: `1`
  - Range: `1` to `6`

- **`max_images`** (`integer`, _optional_):
  If set to a number greater than one, enables multi-image generation. The model will potentially return up to `max_images` images every generation, and in total, `num_images` generations will be carried out. In total, the number of images generated will be between `num_images` and `max_images*num_images`. Default value: `1`
  - Default: `1`
  - Range: `1` to `6`

- **`seed`** (`integer`, _optional_):
  Random seed to control the stochasticity of image generation.

- **`sync_mode`** (`boolean`, _optional_):
  If `True`, the media will be returned as a data URI and the output data won't be available in the request history.
  - Default: `false`

- **`enable_safety_checker`** (`boolean`, _optional_):
  If set to true, the safety checker will be enabled. Default value: `true`
  - Default: `true`
  - Examples: true



**Required Parameters Example**:

```json
{
  "prompt": "A trendy restaurant with a digital menu board displaying \"Seedream 4.0 is available on fal\" in elegant script, with diners enjoying their meals."
}
```

**Full Example**:

```json
{
  "prompt": "A trendy restaurant with a digital menu board displaying \"Seedream 4.0 is available on fal\" in elegant script, with diners enjoying their meals.",
  "image_size": {
    "height": 4096,
    "width": 4096
  },
  "num_images": 1,
  "max_images": 1,
  "enable_safety_checker": true
}
```


### Output Schema

The API returns the following output format:

- **`images`** (`list<Image>`, _required_):
  Generated images
  - Array of Image
  - Examples: [{"url":"https://storage.googleapis.com/falserverless/example_outputs/seedream4_t2i_output.png"}]

- **`seed`** (`integer`, _required_):
  Seed used for generation
  - Examples: 746406749



**Example Response**:

```json
{
  "images": [
    {
      "url": "https://storage.googleapis.com/falserverless/example_outputs/seedream4_t2i_output.png"
    }
  ],
  "seed": 746406749
}
```


## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/bytedance/seedream/v4/text-to-image \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{
     "prompt": "A trendy restaurant with a digital menu board displaying \"Seedream 4.0 is available on fal\" in elegant script, with diners enjoying their meals."
   }'
```

### full js code

import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/bytedance/seedream/v4/text-to-image", {
  input: {
    prompt: "A trendy restaurant with a digital menu board displaying \"Seedream 4.0 is available on fal\" in elegant script, with diners enjoying their meals.",
    image_size: "auto",
    num_images: 1,
    max_images: 1,
    enable_safety_checker: true
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});
console.log(result.data);
console.log(result.requestId);


### Python

Ensure you have the Python client installed:

```bash
pip install fal-client
```

Then use the API client to make requests:

```python
import fal_client

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
           print(log["message"])

result = fal_client.subscribe(
    "fal-ai/bytedance/seedream/v4/text-to-image",
    arguments={
        "prompt": "A trendy restaurant with a digital menu board displaying \"Seedream 4.0 is available on fal\" in elegant script, with diners enjoying their meals."
    },
    with_logs=True,
    on_queue_update=on_queue_update,
)
print(result)
```

### JavaScript

Ensure you have the JavaScript client installed:

```bash
npm install --save @fal-ai/client
```

Then use the API client to make requests:

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/bytedance/seedream/v4/text-to-image", {
  input: {
    prompt: "A trendy restaurant with a digital menu board displaying \"Seedream 4.0 is available on fal\" in elegant script, with diners enjoying their meals."
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});
console.log(result.data);
console.log(result.requestId);
```


## Additional Resources

### Documentation

- [Model Playground](https://fal.ai/models/fal-ai/bytedance/seedream/v4/text-to-image)
- [API Documentation](https://fal.ai/models/fal-ai/bytedance/seedream/v4/text-to-image/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/bytedance/seedream/v4/text-to-image)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)




{
  "openapi": "3.0.4",
  "info": {
    "title": "Queue OpenAPI for fal-ai/bytedance/seedream/v4/text-to-image",
    "version": "1.0.0",
    "description": "The OpenAPI schema for the fal-ai/bytedance/seedream/v4/text-to-image queue.",
    "x-fal-metadata": {
      "endpointId": "fal-ai/bytedance/seedream/v4/text-to-image",
      "category": "text-to-image",
      "thumbnailUrl": "https://fal.media/files/kangaroo/MTKbHTmLwlCPVvxnEPYVW_cd47bf24871b46af9747a5fcb7f4f97b.jpg",
      "playgroundUrl": "https://fal.ai/models/fal-ai/bytedance/seedream/v4/text-to-image",
      "documentationUrl": "https://fal.ai/models/fal-ai/bytedance/seedream/v4/text-to-image/api"
    }
  },
  "components": {
    "securitySchemes": {
      "apiKeyAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization",
        "description": "Fal Key"
      }
    },
    "schemas": {
      "QueueStatus": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string",
            "enum": [
              "IN_QUEUE",
              "IN_PROGRESS",
              "COMPLETED"
            ]
          },
          "request_id": {
            "type": "string",
            "description": "The request id."
          },
          "response_url": {
            "type": "string",
            "description": "The response url."
          },
          "status_url": {
            "type": "string",
            "description": "The status url."
          },
          "cancel_url": {
            "type": "string",
            "description": "The cancel url."
          },
          "logs": {
            "type": "object",
            "description": "The logs.",
            "additionalProperties": true
          },
          "metrics": {
            "type": "object",
            "description": "The metrics.",
            "additionalProperties": true
          },
          "queue_position": {
            "type": "integer",
            "description": "The queue position."
          }
        },
        "required": [
          "status",
          "request_id"
        ]
      },
      "BytedanceSeedreamV4TextToImageInput": {
        "x-fal-order-properties": [
          "prompt",
          "image_size",
          "num_images",
          "max_images",
          "seed",
          "sync_mode",
          "enable_safety_checker"
        ],
        "type": "object",
        "properties": {
          "prompt": {
            "examples": [
              "A trendy restaurant with a digital menu board displaying \"Seedream 4.0 is available on fal\" in elegant script, with diners enjoying their meals."
            ],
            "title": "Prompt",
            "type": "string",
            "description": "The text prompt used to generate the image"
          },
          "num_images": {
            "minimum": 1,
            "maximum": 6,
            "type": "integer",
            "title": "Num Images",
            "description": "Number of separate model generations to be run with the prompt.",
            "default": 1
          },
          "image_size": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/ImageSize"
              },
              {
                "enum": [
                  "square_hd",
                  "square",
                  "portrait_4_3",
                  "portrait_16_9",
                  "landscape_4_3",
                  "landscape_16_9",
                  "auto",
                  "auto_2K",
                  "auto_4K"
                ],
                "type": "string"
              }
            ],
            "title": "Image Size",
            "description": "The size of the generated image. Width and height must be between 1024 and 4096.",
            "examples": [
              {
                "height": 4096,
                "width": 4096
              }
            ],
            "default": {
              "height": 2048,
              "width": 2048
            }
          },
          "max_images": {
            "minimum": 1,
            "maximum": 6,
            "type": "integer",
            "title": "Max Images",
            "description": "If set to a number greater than one, enables multi-image generation. The model will potentially return up to `max_images` images every generation, and in total, `num_images` generations will be carried out. In total, the number of images generated will be between `num_images` and `max_images*num_images`.",
            "default": 1
          },
          "sync_mode": {
            "description": "If `True`, the media will be returned as a data URI and the output data won't be available in the request history.",
            "type": "boolean",
            "title": "Sync Mode",
            "default": false
          },
          "enable_safety_checker": {
            "examples": [true],
            "title": "Enable Safety Checker",
            "type": "boolean",
            "description": "If set to true, the safety checker will be enabled.",
            "default": true
          },
          "seed": {
            "description": "Random seed to control the stochasticity of image generation.",
            "type": "integer",
            "title": "Seed"
          }
        },
        "title": "SeedDream4T2IInput",
        "required": [
          "prompt"
        ]
      },
      "BytedanceSeedreamV4TextToImageOutput": {
        "x-fal-order-properties": [
          "images",
          "seed"
        ],
        "type": "object",
        "properties": {
          "images": {
            "examples": [
              [
                {
                  "url": "https://storage.googleapis.com/falserverless/example_outputs/seedream4_t2i_output.png"
                }
              ]
            ],
            "title": "Images",
            "type": "array",
            "description": "Generated images",
            "items": {
              "$ref": "#/components/schemas/Image"
            }
          },
          "seed": {
            "examples": [746406749],
            "title": "Seed",
            "type": "integer",
            "description": "Seed used for generation"
          }
        },
        "title": "SeedDream4T2IOutput",
        "required": [
          "images",
          "seed"
        ]
      },
      "ImageSize": {
        "x-fal-order-properties": [
          "width",
          "height"
        ],
        "type": "object",
        "properties": {
          "height": {
            "maximum": 14142,
            "type": "integer",
            "title": "Height",
            "description": "The height of the generated image.",
            "exclusiveMinimum": 0,
            "default": 512
          },
          "width": {
            "maximum": 14142,
            "type": "integer",
            "title": "Width",
            "description": "The width of the generated image.",
            "exclusiveMinimum": 0,
            "default": 512
          }
        },
        "title": "ImageSize"
      },
      "Image": {
        "x-fal-order-properties": [
          "url",
          "content_type",
          "file_name",
          "file_size",
          "file_data",
          "width",
          "height"
        ],
        "type": "object",
        "description": "Represents an image file.",
        "title": "Image",
        "properties": {
          "file_size": {
            "examples": [4404019],
            "title": "File Size",
            "type": "integer",
            "description": "The size of the file in bytes."
          },
          "height": {
            "examples": [1024],
            "title": "Height",
            "type": "integer",
            "description": "The height of the image in pixels."
          },
          "url": {
            "description": "The URL where the file can be downloaded from.",
            "type": "string",
            "title": "Url"
          },
          "width": {
            "examples": [1024],
            "title": "Width",
            "type": "integer",
            "description": "The width of the image in pixels."
          },
          "file_name": {
            "examples": [
              "z9RV14K95DvU.png"
            ],
            "title": "File Name",
            "type": "string",
            "description": "The name of the file. It will be auto-generated if not provided."
          },
          "content_type": {
            "examples": [
              "image/png"
            ],
            "title": "Content Type",
            "type": "string",
            "description": "The mime type of the file."
          },
          "file_data": {
            "format": "binary",
            "description": "File data",
            "type": "string",
            "title": "File Data"
          }
        },
        "required": [
          "url"
        ]
      }
    }
  },
  "paths": {
    "/fal-ai/bytedance/seedream/v4/text-to-image/requests/{request_id}/status": {
      "get": {
        "parameters": [
          {
            "name": "request_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "description": "Request ID"
            }
          },
          {
            "name": "logs",
            "in": "query",
            "required": false,
            "schema": {
              "type": "number",
              "description": "Whether to include logs (`1`) in the response or not (`0`)."
            }
          }
        ],
        "responses": {
          "200": {
            "description": "The request status.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/QueueStatus"
                }
              }
            }
          }
        }
      }
    },
    "/fal-ai/bytedance/seedream/v4/text-to-image/requests/{request_id}/cancel": {
      "put": {
        "parameters": [
          {
            "name": "request_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "description": "Request ID"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "The request was cancelled.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "description": "Whether the request was cancelled successfully."
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/fal-ai/bytedance/seedream/v4/text-to-image": {
      "post": {
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BytedanceSeedreamV4TextToImageInput"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The request status.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/QueueStatus"
                }
              }
            }
          }
        }
      }
    },
    "/fal-ai/bytedance/seedream/v4/text-to-image/requests/{request_id}": {
      "get": {
        "parameters": [
          {
            "name": "request_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "description": "Request ID"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Result of the request.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BytedanceSeedreamV4TextToImageOutput"
                }
              }
            }
          }
        }
      }
    }
  },
  "servers": [
    {
      "url": "https://queue.fal.run"
    }
  ],
  "security": [
    {
      "apiKeyAuth": []
    }
  ]
}