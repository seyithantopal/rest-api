# Rest API
It is a simple rest api.
In order to use it,

Run `npm install`

Run `node migration.js up` 

Run `npm start`

In order to test it,

Run `npm install --dev`

Run `npm test` (It should be done for the first time without inserting any data)

### Examples
---
#### Triangle
---
- **Scalene**: All sides are different
`http://localhost:3000/triangle?a=3&b=4&c=5`

- **Equilateral**: All sides are equal
`http://localhost:3000/triangle?a=3&b=3&c=3`

- **Isosceles**: Two sides are equal
`http://localhost:3000/triangle?a=3&b=3&c=5`

- **Incorrect**: It is not a correct triangle
`http://localhost:3000/triangle?a=3&b=4&`

### Blog
---
#### Post
---
- **Create a Post**:

```
POST - http://localhost:3000/posts/
Content-Type: application/json

{
	"title": "First Post",
	"content": "Hello World!",
	"image": "image.jpg"
}
```

- **Read Posts**:
`GET - http://localhost:3000/posts/`

- **Read a Post**:
`GET - http://localhost:3000/posts/{id}`

- **Update a Post**:

```
PUT - http://localhost:3000/posts/{id}
Content-Type: application/json

{
	"title": "Changed Post",
	"content": "Changed Content",
	"image": "image.jpg"
}
```

- **Delete a Post**:
`DELETE - http://localhost:3000/posts/{id}`

#### Comment
---
- **Create a Comment**:

```
POST - http://localhost:3000/comments/
Content-Type: application/json

{
	"post_id": 1,
	"comment": "Comment",
	"date": "03/01/2020"
}
```

- **Read Comments**:
`GET - http://localhost:3000/comments/`

- **Read a Comment**:
`GET - http://localhost:3000/comments/{id}`

- **Update a Comment**:

```
PUT - http://localhost:3000/comments/{id}
Content-Type: application/json

{
	"post_id": 5,
	"comment": "Changed Comment",
	"date": "03/02/2020"
}
```

- **Delete a Comment**:
`DELETE - http://localhost:3000/comments/{id}`
