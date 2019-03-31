# Phrase Rating

This repo is a website that's basically just a visualization of various phrases we say frequently. Each phrase is represented by a 3 dimensional vector that represents its `[humor, severity, importance]` that can be graphed. The values are `1 >= val >= 0`.

EG:

``` javascript
const shitshow = [0.5, 0.8, 0.3];
const clusterfuck = [0.8, 0.8, 0.8];
const hot_mess = [0.4, 0.2, 0.1];
```

You get the idea.

## Frontend

### Installing TypeScript Dependencies

1. `npm install`

### Running project

1. `npm run build`
2. `npm run start`
3. Go to `localhost:8080`

## Server

### Installing Python Dependencies

1. `pip install poetry`
2. `pip install --upgrade jsonschema --pre` - [Related Issue](https://github.com/sdispater/poetry/issues/532)
3. `poetry install`
