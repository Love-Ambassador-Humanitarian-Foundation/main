
---

# LAHF API

Welcome to the **LAHF API**. This API provides endpoints for managing users, events, partners, payments, logs, notifications, and more within the LAHF application. The API is designed to be RESTful and is built using Django and Django REST Framework.

## Version

**1.0.0**

## Table of Contents

- [Base URL](#base-url)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Home](#home)
  - [About](#about)
  - [Events](#events)
  - [Partners](#partners)
  - [Users](#users)
  - [Payments](#payments)
  - [Logs](#logs)
  - [Notifications](#notifications)
- [Error Handling](#error-handling)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Base URL

```
http://localhost:8000/api
```

## Authentication

The API uses JWT (JSON Web Token) for authentication. To access most endpoints, you need to provide a valid token in the `Authorization` header as follows:

```
Authorization: Bearer <your-token>
```

You can obtain a token by logging in through the `/api/users/login` endpoint.

## Endpoints

### Home

#### `GET /api/home`

**Description:** Welcome endpoint that returns the name and version of the API.

**Response:**

```json
{
  "success": "true",
  "message": "Welcome to LAHF version 1.0.0",
  "response": {
    "name": "LAHF",
    "version": "1.0.0"
  }
}
```

### About

#### `GET /api/about`

**Description:** Retrieve the company details.

**Response:**

```json
{
  "success": "true",
  "message": "Retrieved the company details",
  "response": {
    "id": "<uuid:id>",
    "name": "LAHF Company",
    "description": "This is a description of the company."
  }
}
```

#### `POST /api/about`

**Description:** Create new company details.

**Request Body:**

```json
{
  "name": "LAHF Company",
  "description": "This is a description of the company."
}
```

**Response:**

```json
{
  "success": "true",
  "message": "Company details created successfully",
  "response": {
    "id": "<uuid:id>",
    "name": "LAHF Company",
    "description": "This is a description of the company."
  }
}
```

### Events

#### `GET /api/events`

**Description:** Retrieve all events.

**Response:**

```json
{
  "success": "true",
  "message": "Retrieved all events",
  "response": [
    {
      "id": "<uuid:id>",
      "title": "Event 1",
      "description": "Event 1 description",
      ...
    }
  ]
}
```

#### `POST /api/events`

**Description:** Create a new event.

**Request Body:**

```json
{
  "title": "Event 1",
  "description": "Event 1 description",
  ...
}
```

**Response:**

```json
{
  "success": "true",
  "message": "Event created successfully",
  "response": {
    "id": "<uuid:id>",
    "title": "Event 1",
    "description": "Event 1 description",
    ...
  }
}
```

#### `GET /api/events/<uuid:id>`

**Description:** Retrieve details of a specific event by its ID.

**Response:**

```json
{
  "success": "true",
  "message": "Event retrieved successfully",
  "response": {
    "id": "<uuid:id>",
    "title": "Event 1",
    "description": "Event 1 description",
    ...
  }
}
```

#### `PUT /api/events/<uuid:id>`

**Description:** Update details of a specific event by its ID.

**Request Body:**

```json
{
  "title": "Updated Event 1",
  "description": "Updated Event 1 description",
  ...
}
```

**Response:**

```json
{
  "success": "true",
  "message": "Event updated successfully",
  "response": {
    "id": "<uuid:id>",
    "title": "Updated Event 1",
    "description": "Updated Event 1 description",
    ...
  }
}
```

#### `DELETE /api/events/<uuid:id>`

**Description:** Delete a specific event by its ID.

**Response:**

```json
{
  "success": "true",
  "message": "Event deleted successfully"
}
```

### Partners

#### `GET /api/partners`

**Description:** Retrieve all partners.

**Response:**

```json
{
  "success": "true",
  "message": "Partners retrieved successfully",
  "data": [
    {
      "id": "<uuid:id>",
      "name": "Partner 1",
      ...
    }
  ]
}
```

#### `POST /api/partners`

**Description:** Create a new partner.

**Request Body:**

```json
{
  "name": "Partner 1",
  ...
}
```

**Response:**

```json
{
  "success": "true",
  "message": "Partner created successfully",
  "data": {
    "id": "<uuid:id>",
    "name": "Partner 1",
    ...
  }
}
```

### Users

#### `POST /api/users/register`

**Description:** Register a new user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstname": "John",
  "lastname": "Doe"
}
```

**Response:**

```json
{
  "success": "true",
  "message": "User registered successfully",
  "userid": "<uuid:id>",
  "email": "user@example.com",
  "refresh": "<refresh-token>",
  "access": "<access-token>"
}
```

#### `POST /api/users/login`

**Description:** Log in a user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": "true",
  "message": "Login successful",
  "userid": "<uuid:id>",
  "email": "user@example.com",
  "refresh": "<refresh-token>",
  "access": "<access-token>"
}
```

### Payments

#### `GET /api/payments`

**Description:** Retrieve all payments.

**Response:**

```json
{
  "success": "true",
  "message": "Payments retrieved successfully",
  "data": [
    {
      "id": "<uuid:id>",
      "amount": 100.00,
      ...
    }
  ]
}
```

#### `POST /api/payments`

**Description:** Create a new payment.

**Request Body:**

```json
{
  "amount": 100.00,
  ...
}
```

**Response:**

```json
{
  "success": "true",
  "message": "Payment created successfully",
  "data": {
    "id": "<uuid:id>",
    "amount": 100.00,
    ...
  }
}
```

### Logs

#### `GET /api/logs`

**Description:** Retrieve all logs.

**Response:**

```json
{
  "success": "true",
  "message": "Logs retrieved successfully",
  "data": [
    {
      "id": "<uuid:id>",
      "action": "User logged in",
      ...
    }
  ]
}
```

#### `POST /api/logs`

**Description:** Create a new log entry.

**Request Body:**

```json
{
  "action": "User logged in",
  ...
}
```

**Response:**

```json
{
  "success": "true",
  "message": "Log created successfully",
  "data": {
    "id": "<uuid:id>",
    "action": "User logged in",
    ...
  }
}
```

### Notifications

#### `GET /api/notifications`

**Description:** Retrieve all notifications.

**Response:**

```json
{
  "success": "true",
  "message": "Notifications retrieved successfully",
  "data": [
    {
      "id": "<uuid:id>",
      "message": "You have a new event invitation.",
      ...
    }
  ]
}
```

#### `POST /api/notifications`

**Description:** Create a new notification.

**Request Body:**

```json
{
  "message": "You have a new event invitation.",
  ...
}
```

**Response:**

```json
{
  "success": "true",
  "message": "Notification created successfully",
  "data": {
    "id": "<uuid:id>",
    "message": "You have a new event invitation.",
    ...
  }
}
```
Here is the README file updated to include the Notifications API with the specified format. I've also added a section at the end about licensing.

---


### Email

#### `POST /api/emails/send`

**Description:** Send an email to one or multiple recipients.

**Request Body:**

```json
{
  "subject": "Subject of the email",
  "body": "Body of the email",
  "recipients": [
    "recipient1@example.com",
    "recipient2@example.com"
  ],
  "sender": "sender@example.com"
}
```

**Response:**

```json
{
  "success": "true",
  "message": "Email sent successfully",
  "data": {
    "id": "<uuid:id>",
    "subject": "Subject of the email",
    "body": "Body of the email",
    "recipients": [
      "recipient1@example.com",
      "recipient2@example.com"
    ],
    "sender": "sender@example.com",
    "status": "sent"
  }
}
```

#### `GET /api/emails/logs`

**Description:** Retrieve a list of all sent email logs.

**Response:**

```json
{
  "success": "true",
  "message": "Email logs retrieved successfully",
  "data": [
    {
      "id": "<uuid:id>",
      "subject": "Subject of the email",
      "body": "Body of the email",
      "recipients": [
        "recipient1@example.com",
        "recipient2@example.com"
      ],
      "sender": "sender@example.com",
      "status": "sent",
      "timestamp": "2024-08-19T12:34:56Z"
    }
  ]
}
```

#### `GET /api/emails/logs/<uuid:id>`

**Description:** Retrieve details of a specific email log by its ID.

**Response:**

```json
{
  "success": "true",
  "message": "Email log retrieved successfully",
  "data": {
    "id": "<uuid:id>",
    "subject": "Subject of the email",
    "body": "Body of the email",
    "recipients": [
      "recipient1@example.com",
      "recipient2@example.com"
    ],
    "sender": "sender@example.com",
    "status": "sent",
    "timestamp": "2024-08-19T12:34:56Z"
  }
}
```

## Error Handling

The API returns appropriate HTTP status codes for errors, along with a JSON response containing the error message. Common status codes include:

- **400 Bad Request:** Invalid input data.
- **401 Unauthorized:** Authentication required or failed.
- **404 Not Found:** Resource not found.
- **500 Internal Server Error:** Server encountered an error.

**Example Error Response:**

```json
{
  "success": "false",
  "message": "Failed to create

 event",
  "errors": {
    "title": ["This field is required."]
  }
}
```

## License

This project is licensed under the [Proprietary License](LICENSE). See the [LICENSE](LICENSE) file for more details.

--- 
