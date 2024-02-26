This is grapqhl api version 1.0

## How to use
- Clone the repository
- Run `npm install`
- Run `npm start`
- Open `http://localhost:4000/graphql` in your browser
- You can use the graphql playground to test the api
- You can also use the api with any graphql client
- You can also use the api with any graphql client

## Queries

### Get all users
```graphql
query {
  users {
    id
    name
    email
  }
}
```

### Get user by id
```graphql
query {
  user(id: 1) {
    id
    name
    email
  }
}
```

### Get all posts
```graphql
query {
  posts {
    id
    title
    body
  }
}
```

### Get post by id
```graphql
query {
  post(id: 1) {
    id
    title
    body
  }
}
```

### Get all comments
```graphql
query {
  comments {
    id
    name
    email
    body
  }
}
```

### Get comment

```graphql
query {
  comment(id: 1) {
    id
    name
    email
    body
  }
}
```

## Mutations

### Create user
```graphql
mutation {
  createUser(name: "John Doe", email: "rokas@rokas.com")
}
```

### Create post
```graphql
mutation {
  createPost(title: "Hello World", body: "This is a post body")
}
```

### Create comment
```graphql
mutation {
  createComment(name: "John Doe", email: "rokas@rokas.com", body: "This is a comment body")
}
```

### Update user
```graphql
mutation {
  updateUser(id: 1, name: "John Doe", email: "rokas@rokas.com")
}
```
