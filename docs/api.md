## Users

#### Create User

```bash
POST /api/users
```

Request

```bash
{
  "name": "Bob Smith",
  "email": "bob@example.com",
  "phone": "+1234567891"
}
```

Response

```bash
{
  "success": true,
  "data": {
    "id": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
    "name": "Bob Smith",
    "email": "bob@example.com",
    "phone": "+1234567891",
    "createdAt": "2025-12-20T10:16:07.191Z",
    "updatedAt": "2025-12-20T10:16:07.191Z"
  },
}
```

#### Get All Users

```bash
GET /api/users
```

Response

```bash
{
  "success": true,
  "data": [
    {
      "id": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "phone": "+1234567890",
      "createdAt": "2025-12-19T21:03:37.973Z"
    },
    {
      "id": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
      "name": "Bob Smith",
      "email": "bob@example.com",
      "phone": "+1234567891",
      "createdAt": "2025-12-20T10:16:07.191Z"
    },
    {
      "id": "82329491-fef3-4145-9e43-a0211fb0880d",
      "name": "Charlie Brown",
      "email": "charlie@example.com",
      "phone": "+1234567892",
      "createdAt": "2025-12-20T10:17:37.617Z"
    }
  ]
}

```

#### Get User By ID

```bash
GET /api/users/:userId

/api/users/be146576-6359-4813-98bc-6e7e4e3c9f1c
```

Response

```bash
{
  "success": true,
  "data": {
    "id": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "phone": "+1234567890",
    "createdAt": "2025-12-19T21:03:37.973Z",
    "updatedAt": "2025-12-19T21:03:37.973Z",
    "groupMembers": []
  }
}
```

#### Update User

```bash
PUT /api/users/:userId

/api/users/be146576-6359-4813-98bc-6e7e4e3c9f1c
```

```bash
{
  "success": true,
  "data": {
    "id": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
    "name": "Alice Johnson Updated",
    "email": "alice@example.com",
    "phone": "+9876543210",
    "createdAt": "2025-12-19T21:03:37.973Z",
    "updatedAt": "2025-12-20T10:21:47.566Z"
  }
}
```

## Groups

#### Create Group

```bash
POST /api/groups
```

Request

```bash
{
  "name": "Goa Trip 2024",
  "description": "Beach vacation expenses",
  "members": ["0b069537-70db-4dc7-9d50-da2e3a1b9f4a", "82329491-fef3-4145-9e43-a0211fb0880d", "be146576-6359-4813-98bc-6e7e4e3c9f1c"]
}
```

Response

```bash
{
  "success": true,
  "data": {
    "id": "f4774b38-32eb-43ea-93e5-d4c83887a575",
    "name": "Goa Trip 2024",
    "description": "Beach vacation expenses",
    "createdAt": "2025-12-20T10:28:37.973Z",
    "updatedAt": "2025-12-20T10:28:37.973Z",
    "members": [
      {
        "id": "7a95c1c9-4ad4-4626-b3e5-de32ef8edc4c",
        "userId": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
        "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
        "role": "admin",
        "createdAt": "2025-12-20T10:28:37.973Z",
        "user": {
          "id": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
          "name": "Bob Smith",
          "email": "bob@example.com"
        }
      },
      {
        "id": "1daa6f9a-7f3f-443c-a4b5-ecf89c5b309d",
        "userId": "82329491-fef3-4145-9e43-a0211fb0880d",
        "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
        "role": "member",
        "createdAt": "2025-12-20T10:28:37.973Z",
        "user": {
          "id": "82329491-fef3-4145-9e43-a0211fb0880d",
          "name": "Charlie Brown",
          "email": "charlie@example.com"
        }
      },
      {
        "id": "8b1e4d38-f525-46a4-b91d-ccc7e7c1df42",
        "userId": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
        "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
        "role": "member",
        "createdAt": "2025-12-20T10:28:37.973Z",
        "user": {
          "id": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
          "name": "Alice Johnson Updated",
          "email": "alice@example.com"
        }
      }
    ]
  }
}
```

#### Get Group By ID

```bash
GET /api/groups/:groupid

/api/groups/f4774b38-32eb-43ea-93e5-d4c83887a575
```

```bash
{
  "success": true,
  "data": {
    "id": "f4774b38-32eb-43ea-93e5-d4c83887a575",
    "name": "Goa Trip 2024",
    "description": "Beach vacation expenses",
    "createdAt": "2025-12-20T10:28:37.973Z",
    "updatedAt": "2025-12-20T10:28:37.973Z",
    "members": [
      {
        "id": "7a95c1c9-4ad4-4626-b3e5-de32ef8edc4c",
        "userId": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
        "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
        "role": "admin",
        "createdAt": "2025-12-20T10:28:37.973Z",
        "user": {
          "id": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
          "name": "Bob Smith",
          "email": "bob@example.com"
        }
      },
      {
        "id": "1daa6f9a-7f3f-443c-a4b5-ecf89c5b309d",
        "userId": "82329491-fef3-4145-9e43-a0211fb0880d",
        "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
        "role": "member",
        "createdAt": "2025-12-20T10:28:37.973Z",
        "user": {
          "id": "82329491-fef3-4145-9e43-a0211fb0880d",
          "name": "Charlie Brown",
          "email": "charlie@example.com"
        }
      },
      {
        "id": "8b1e4d38-f525-46a4-b91d-ccc7e7c1df42",
        "userId": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
        "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
        "role": "member",
        "createdAt": "2025-12-20T10:28:37.973Z",
        "user": {
          "id": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
          "name": "Alice Johnson Updated",
          "email": "alice@example.com"
        }
      }
    ],
    "expenses": []
  }
}
```

#### Add a Member to Group

```bash
# First create a new user

POST /api/users

Request {"name":"David Lee","email":"david@example.com"}

Response
{
  "success": true,
  "data": {
    "id": "b97030ec-543d-487b-a867-1a674a97e864",
    "name": "David Lee",
    "email": "david@example.com",
    "phone": null,
    "createdAt": "2025-12-20T10:35:47.039Z",
    "updatedAt": "2025-12-20T10:35:47.039Z"
  }
}
```

```bash
# Then add to group (replace GROUP_ID and USER_ID_4)

POST /api/groups/:groupId/members
/api/groups/f4774b38-32eb-43ea-93e5-d4c83887a575/members
```

Request

```bash
{
  "userId": "b97030ec-543d-487b-a867-1a674a97e864",
  "role": "member"
}
```

Response

```bash
{
  "success": true,
  "data": {
    "id": "8349cd76-f043-48f9-8474-388ed21a0099",
    "userId": "b97030ec-543d-487b-a867-1a674a97e864",
    "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
    "role": "member",
    "createdAt": "2025-12-20T10:37:59.769Z",
    "user": {
      "id": "b97030ec-543d-487b-a867-1a674a97e864",
      "name": "David Lee",
      "email": "david@example.com"
    }
  }
}
```

Get All Groups

```bash
GET /api/groups
```

Response

```bash
{
  "success": true,
  "data": [
    {
      "id": "f4774b38-32eb-43ea-93e5-d4c83887a575",
      "name": "Goa Trip 2024",
      "description": "Beach vacation expenses",
      "createdAt": "2025-12-20T10:28:37.973Z",
      "updatedAt": "2025-12-20T10:28:37.973Z",
      "members": [
        {
          "id": "7a95c1c9-4ad4-4626-b3e5-de32ef8edc4c",
          "userId": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
          "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
          "role": "admin",
          "createdAt": "2025-12-20T10:28:37.973Z",
          "user": {
            "id": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
            "name": "Bob Smith",
            "email": "bob@example.com"
          }
        },
        {
          "id": "1daa6f9a-7f3f-443c-a4b5-ecf89c5b309d",
          "userId": "82329491-fef3-4145-9e43-a0211fb0880d",
          "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
          "role": "member",
          "createdAt": "2025-12-20T10:28:37.973Z",
          "user": {
            "id": "82329491-fef3-4145-9e43-a0211fb0880d",
            "name": "Charlie Brown",
            "email": "charlie@example.com"
          }
        },
        {
          "id": "8b1e4d38-f525-46a4-b91d-ccc7e7c1df42",
          "userId": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
          "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
          "role": "member",
          "createdAt": "2025-12-20T10:28:37.973Z",
          "user": {
            "id": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
            "name": "Alice Johnson Updated",
            "email": "alice@example.com"
          }
        },
        {
          "id": "8349cd76-f043-48f9-8474-388ed21a0099",
          "userId": "b97030ec-543d-487b-a867-1a674a97e864",
          "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
          "role": "member",
          "createdAt": "2025-12-20T10:37:59.769Z",
          "user": {
            "id": "b97030ec-543d-487b-a867-1a674a97e864",
            "name": "David Lee",
            "email": "david@example.com"
          }
        }
      ]
    }
  ]
}
```

Remove Member from Group

```bash
DELETE /api/groups/:groupId/members/:userId

/api/groups/f4774b38-32eb-43ea-93e5-d4c83887a575/members/b97030ec-543d-487b-a867-1a674a97e864
```

```bash
{ "success": true, "message": "Member removed successfully" }
```

## Expense

#### Create Expense - [SplitType : EQUAL]

```bash
POST /api/expenses
```

```Request
{
  "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
  "paidBy": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
  "amount": 3000,
  "description": "Hotel Booking",
  "splitType": "EQUAL",
  "splits": [
    {"userId": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a"},
    {"userId": "82329491-fef3-4145-9e43-a0211fb0880d"},
    {"userId": "be146576-6359-4813-98bc-6e7e4e3c9f1c"}
  ]
}
```

Response

```bash
{
  "success": true,
  "data": {
    "id": "656530a1-181d-4d8d-8b6f-7e85e9a69cc0",
    "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
    "paidBy": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
    "amount": "3000",
    "description": "Hotel Booking",
    "splitType": "EQUAL",
    "createdAt": "2025-12-20T10:50:36.924Z",
    "updatedAt": "2025-12-20T10:50:36.924Z",
    "payer": {
      "id": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
      "name": "Bob Smith",
      "email": "bob@example.com"
    },
    "splits": [
      {
        "id": "814df7ce-6550-44c7-a9b8-49aa42b9de25",
        "expenseId": "656530a1-181d-4d8d-8b6f-7e85e9a69cc0",
        "userId": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
        "amount": "1000",
        "percentage": null,
        "createdAt": "2025-12-20T10:50:36.924Z",
        "user": {
          "id": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
          "name": "Bob Smith",
          "email": "bob@example.com"
        }
      },
      {
        "id": "e9a80f4b-184c-46c6-9d15-37224f9c94c9",
        "expenseId": "656530a1-181d-4d8d-8b6f-7e85e9a69cc0",
        "userId": "82329491-fef3-4145-9e43-a0211fb0880d",
        "amount": "1000",
        "percentage": null,
        "createdAt": "2025-12-20T10:50:36.924Z",
        "user": {
          "id": "82329491-fef3-4145-9e43-a0211fb0880d",
          "name": "Charlie Brown",
          "email": "charlie@example.com"
        }
      },
      {
        "id": "81e821f2-4886-4dd9-80ea-4b38f6395b6b",
        "expenseId": "656530a1-181d-4d8d-8b6f-7e85e9a69cc0",
        "userId": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
        "amount": "1000",
        "percentage": null,
        "createdAt": "2025-12-20T10:50:36.924Z",
        "user": {
          "id": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
          "name": "Alice Johnson Updated",
          "email": "alice@example.com"
        }
      }
    ]
  }
}
```

#### Create Expense - [SplitType : EXACT]

```bash
POST /api/expenses
```

Request

```bash
{
  "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
  "paidBy": "82329491-fef3-4145-9e43-a0211fb0880d",
  "amount": 4500,
  "description": "Dinner at Beach Shack",
  "splitType": "EXACT",
  "splits": [
    {"userId": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a", "amount": 1500},
    {"userId": "82329491-fef3-4145-9e43-a0211fb0880d", "amount": 2000},
    {"userId": "be146576-6359-4813-98bc-6e7e4e3c9f1c", "amount": 1000}
  ]
}
```

Response

```bash
{
  "success": true,
  "data": {
    "id": "65fa2c2d-20b5-473c-bc99-af57da37c7e7",
    "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
    "paidBy": "82329491-fef3-4145-9e43-a0211fb0880d",
    "amount": "4500",
    "description": "Dinner at Beach Shack",
    "splitType": "EXACT",
    "createdAt": "2025-12-20T10:54:17.035Z",
    "updatedAt": "2025-12-20T10:54:17.035Z",
    "payer": {
      "id": "82329491-fef3-4145-9e43-a0211fb0880d",
      "name": "Charlie Brown",
      "email": "charlie@example.com"
    },
    "splits": [
      {
        "id": "ae60dfc6-a0fc-430c-91c4-e5e1995c1b68",
        "expenseId": "65fa2c2d-20b5-473c-bc99-af57da37c7e7",
        "userId": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
        "amount": "1500",
        "percentage": null,
        "createdAt": "2025-12-20T10:54:17.035Z",
        "user": {
          "id": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
          "name": "Bob Smith",
          "email": "bob@example.com"
        }
      },
      {
        "id": "bcf3c797-8cc0-4a20-9fb7-97480e10203e",
        "expenseId": "65fa2c2d-20b5-473c-bc99-af57da37c7e7",
        "userId": "82329491-fef3-4145-9e43-a0211fb0880d",
        "amount": "2000",
        "percentage": null,
        "createdAt": "2025-12-20T10:54:17.035Z",
        "user": {
          "id": "82329491-fef3-4145-9e43-a0211fb0880d",
          "name": "Charlie Brown",
          "email": "charlie@example.com"
        }
      },
      {
        "id": "7cc8ab9e-2b50-4d90-b72a-30d860b93b4c",
        "expenseId": "65fa2c2d-20b5-473c-bc99-af57da37c7e7",
        "userId": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
        "amount": "1000",
        "percentage": null,
        "createdAt": "2025-12-20T10:54:17.035Z",
        "user": {
          "id": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
          "name": "Alice Johnson Updated",
          "email": "alice@example.com"
        }
      }
    ]
  }
}
```

#### Create Expense - [SplitType : PERCENTAGE]

```bash
POST /api/expenses
```

Request

```bash
{
  "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
  "paidBy": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
  "amount": 6000,
  "description": "Car Rental",
  "splitType": "PERCENTAGE",
  "splits": [
    {"userId": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a", "percentage": 40},
    {"userId": "82329491-fef3-4145-9e43-a0211fb0880d", "percentage": 35},
    {"userId": "be146576-6359-4813-98bc-6e7e4e3c9f1c", "percentage": 25}
  ]
}
```

Response

```bash
{
  "success": true,
  "data": {
    "id": "e02d3982-9ecc-493c-8033-b625c9251609",
    "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
    "paidBy": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
    "amount": "6000",
    "description": "Car Rental",
    "splitType": "PERCENTAGE",
    "createdAt": "2025-12-20T10:59:06.866Z",
    "updatedAt": "2025-12-20T10:59:06.866Z",
    "payer": {
      "id": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
      "name": "Alice Johnson Updated",
      "email": "alice@example.com"
    },
    "splits": [
      {
        "id": "5feabff8-947c-401e-b807-139f0ef3bc8f",
        "expenseId": "e02d3982-9ecc-493c-8033-b625c9251609",
        "userId": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
        "amount": "2400",
        "percentage": "40",
        "createdAt": "2025-12-20T10:59:06.866Z",
        "user": {
          "id": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
          "name": "Bob Smith",
          "email": "bob@example.com"
        }
      },
      {
        "id": "c2fa7267-f88f-428e-8a0e-e92c2bd3da9b",
        "expenseId": "e02d3982-9ecc-493c-8033-b625c9251609",
        "userId": "82329491-fef3-4145-9e43-a0211fb0880d",
        "amount": "2100",
        "percentage": "35",
        "createdAt": "2025-12-20T10:59:06.866Z",
        "user": {
          "id": "82329491-fef3-4145-9e43-a0211fb0880d",
          "name": "Charlie Brown",
          "email": "charlie@example.com"
        }
      },
      {
        "id": "65785c1c-f798-4cdc-b247-090183e8fe09",
        "expenseId": "e02d3982-9ecc-493c-8033-b625c9251609",
        "userId": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
        "amount": "1500",
        "percentage": "25",
        "createdAt": "2025-12-20T10:59:06.866Z",
        "user": {
          "id": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
          "name": "Alice Johnson Updated",
          "email": "alice@example.com"
        }
      }
    ]
  }
}
```

#### Get Group Expense

```bash
GET /api/expenses/group/:groupId

/api/expenses/group/f4774b38-32eb-43ea-93e5-d4c83887a575
```

Response

```bash
{
  "success": true,
  "data": [
    {
      "id": "e02d3982-9ecc-493c-8033-b625c9251609",
      "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
      "paidBy": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
      "amount": "6000",
      "description": "Car Rental",
      "splitType": "PERCENTAGE",
      "createdAt": "2025-12-20T10:59:06.866Z",
      "updatedAt": "2025-12-20T10:59:06.866Z",
      "payer": {
        "id": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
        "name": "Alice Johnson Updated",
        "email": "alice@example.com"
      },
      "splits": [
        {
          "id": "5feabff8-947c-401e-b807-139f0ef3bc8f",
          "expenseId": "e02d3982-9ecc-493c-8033-b625c9251609",
          "userId": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
          "amount": "2400",
          "percentage": "40",
          "createdAt": "2025-12-20T10:59:06.866Z",
          "user": {
            "id": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
            "name": "Bob Smith"
          }
        },
        {
          "id": "c2fa7267-f88f-428e-8a0e-e92c2bd3da9b",
          "expenseId": "e02d3982-9ecc-493c-8033-b625c9251609",
          "userId": "82329491-fef3-4145-9e43-a0211fb0880d",
          "amount": "2100",
          "percentage": "35",
          "createdAt": "2025-12-20T10:59:06.866Z",
          "user": {
            "id": "82329491-fef3-4145-9e43-a0211fb0880d",
            "name": "Charlie Brown"
          }
        },
        {
          "id": "65785c1c-f798-4cdc-b247-090183e8fe09",
          "expenseId": "e02d3982-9ecc-493c-8033-b625c9251609",
          "userId": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
          "amount": "1500",
          "percentage": "25",
          "createdAt": "2025-12-20T10:59:06.866Z",
          "user": {
            "id": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
            "name": "Alice Johnson Updated"
          }
        }
      ]
    },
    {
      "id": "65fa2c2d-20b5-473c-bc99-af57da37c7e7",
      "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
      "paidBy": "82329491-fef3-4145-9e43-a0211fb0880d",
      "amount": "4500",
      "description": "Dinner at Beach Shack",
      "splitType": "EXACT",
      "createdAt": "2025-12-20T10:54:17.035Z",
      "updatedAt": "2025-12-20T10:54:17.035Z",
      "payer": {
        "id": "82329491-fef3-4145-9e43-a0211fb0880d",
        "name": "Charlie Brown",
        "email": "charlie@example.com"
      },
      "splits": [
        {
          "id": "ae60dfc6-a0fc-430c-91c4-e5e1995c1b68",
          "expenseId": "65fa2c2d-20b5-473c-bc99-af57da37c7e7",
          "userId": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
          "amount": "1500",
          "percentage": null,
          "createdAt": "2025-12-20T10:54:17.035Z",
          "user": {
            "id": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
            "name": "Bob Smith"
          }
        },
        {
          "id": "bcf3c797-8cc0-4a20-9fb7-97480e10203e",
          "expenseId": "65fa2c2d-20b5-473c-bc99-af57da37c7e7",
          "userId": "82329491-fef3-4145-9e43-a0211fb0880d",
          "amount": "2000",
          "percentage": null,
          "createdAt": "2025-12-20T10:54:17.035Z",
          "user": {
            "id": "82329491-fef3-4145-9e43-a0211fb0880d",
            "name": "Charlie Brown"
          }
        },
        {
          "id": "7cc8ab9e-2b50-4d90-b72a-30d860b93b4c",
          "expenseId": "65fa2c2d-20b5-473c-bc99-af57da37c7e7",
          "userId": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
          "amount": "1000",
          "percentage": null,
          "createdAt": "2025-12-20T10:54:17.035Z",
          "user": {
            "id": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
            "name": "Alice Johnson Updated"
          }
        }
      ]
    },
    {
      "id": "656530a1-181d-4d8d-8b6f-7e85e9a69cc0",
      "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
      "paidBy": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
      "amount": "3000",
      "description": "Hotel Booking",
      "splitType": "EQUAL",
      "createdAt": "2025-12-20T10:50:36.924Z",
      "updatedAt": "2025-12-20T10:50:36.924Z",
      "payer": {
        "id": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
        "name": "Bob Smith",
        "email": "bob@example.com"
      },
      "splits": [
        {
          "id": "814df7ce-6550-44c7-a9b8-49aa42b9de25",
          "expenseId": "656530a1-181d-4d8d-8b6f-7e85e9a69cc0",
          "userId": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
          "amount": "1000",
          "percentage": null,
          "createdAt": "2025-12-20T10:50:36.924Z",
          "user": {
            "id": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
            "name": "Bob Smith"
          }
        },
        {
          "id": "e9a80f4b-184c-46c6-9d15-37224f9c94c9",
          "expenseId": "656530a1-181d-4d8d-8b6f-7e85e9a69cc0",
          "userId": "82329491-fef3-4145-9e43-a0211fb0880d",
          "amount": "1000",
          "percentage": null,
          "createdAt": "2025-12-20T10:50:36.924Z",
          "user": {
            "id": "82329491-fef3-4145-9e43-a0211fb0880d",
            "name": "Charlie Brown"
          }
        },
        {
          "id": "81e821f2-4886-4dd9-80ea-4b38f6395b6b",
          "expenseId": "656530a1-181d-4d8d-8b6f-7e85e9a69cc0",
          "userId": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
          "amount": "1000",
          "percentage": null,
          "createdAt": "2025-12-20T10:50:36.924Z",
          "user": {
            "id": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
            "name": "Alice Johnson Updated"
          }
        }
      ]
    }
  ]
}
```

#### Get Expense By ID

```bash
GET /api/expenses/:expenseId

/api/expenses/656530a1-181d-4d8d-8b6f-7e85e9a69cc0
```

Response

```bash
{
  "success": true,
  "data": {
    "id": "656530a1-181d-4d8d-8b6f-7e85e9a69cc0",
    "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
    "paidBy": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
    "amount": "3000",
    "description": "Hotel Booking",
    "splitType": "EQUAL",
    "createdAt": "2025-12-20T10:50:36.924Z",
    "updatedAt": "2025-12-20T10:50:36.924Z",
    "payer": {
      "id": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
      "name": "Bob Smith",
      "email": "bob@example.com"
    },
    "splits": [
      {
        "id": "814df7ce-6550-44c7-a9b8-49aa42b9de25",
        "expenseId": "656530a1-181d-4d8d-8b6f-7e85e9a69cc0",
        "userId": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
        "amount": "1000",
        "percentage": null,
        "createdAt": "2025-12-20T10:50:36.924Z",
        "user": {
          "id": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
          "name": "Bob Smith",
          "email": "bob@example.com"
        }
      },
      {
        "id": "e9a80f4b-184c-46c6-9d15-37224f9c94c9",
        "expenseId": "656530a1-181d-4d8d-8b6f-7e85e9a69cc0",
        "userId": "82329491-fef3-4145-9e43-a0211fb0880d",
        "amount": "1000",
        "percentage": null,
        "createdAt": "2025-12-20T10:50:36.924Z",
        "user": {
          "id": "82329491-fef3-4145-9e43-a0211fb0880d",
          "name": "Charlie Brown",
          "email": "charlie@example.com"
        }
      },
      {
        "id": "81e821f2-4886-4dd9-80ea-4b38f6395b6b",
        "expenseId": "656530a1-181d-4d8d-8b6f-7e85e9a69cc0",
        "userId": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
        "amount": "1000",
        "percentage": null,
        "createdAt": "2025-12-20T10:50:36.924Z",
        "user": {
          "id": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
          "name": "Alice Johnson Updated",
          "email": "alice@example.com"
        }
      }
    ]
  }
}
```

## Balance

#### Get Group Balances (Simplified)

```bash
GET /api/balances/group/:groupId

/api/balances/group/f4774b38-32eb-43ea-93e5-d4c83887a575
```

Response

```bash
{
  "success": true,
  "data": {
    "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
    "groupName": "Goa Trip 2024",
    "balances": [
      {
        "from": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
        "to": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
        "amount": 1900
      },
      {
        "from": "82329491-fef3-4145-9e43-a0211fb0880d",
        "to": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
        "amount": 600
      }
    ]
  }
}
```

#### Get User Balance in Specific Group

```bash
GET /api/balances/user/:userId/group/:groupId

/api/balances/user/be146576-6359-4813-98bc-6e7e4e3c9f1c/group/f4774b38-32eb-43ea-93e5-d4c83887a575
```

Response

```bash
{
  "success": true,
  "data": {
    "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
    "userId": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
    "owes": [
      {
        "userId": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
        "userName": "Bob Smith",
        "amount": 1000
      },
      {
        "userId": "82329491-fef3-4145-9e43-a0211fb0880d",
        "userName": "Charlie Brown",
        "amount": 1000
      }
    ],
    "owedBy": [
      {
        "userId": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
        "userName": "Bob Smith",
        "amount": 2400
      },
      {
        "userId": "82329491-fef3-4145-9e43-a0211fb0880d",
        "userName": "Charlie Brown",
        "amount": 2100
      }
    ],
    "totalOwes": 2000,
    "totalOwedBy": 4500,
    "netBalance": 2500
  }
}
```

#### Get User Balances (All Groups)

```bash
GET /api/balances/user/:userId
```

we can try it by creating multiple groups.

## Settlements

#### Record a Settlement

```bash
POST /api/settlements
```

Request

```bash
{
 "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
 "fromUser": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
 "toUser": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
 "amount": 1900
}
```

Response

```bash
{
  "success": true,
  "data": {
    "id": "6a98cb8d-35d7-47c9-8e1c-1c17f46e86f6",
    "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
    "fromUser": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
    "toUser": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
    "amount": "1900",
    "createdAt": "2025-12-20T11:18:41.334Z",
    "from": {
      "id": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
      "name": "Bob Smith",
      "email": "bob@example.com"
    },
    "to": {
      "id": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
      "name": "Alice Johnson Updated",
      "email": "alice@example.com"
    }
  }
}
```

Here Bob settled with 1900 amount , if i again hit Get group balance api point then bob's owes 1900 amount record is already removed from balance sheet.

#### Get Group Settlement

```bash
GET /api/settlements/group/:groupId

/api/settlements/group/f4774b38-32eb-43ea-93e5-d4c83887a575
```

Response

```bash
{
  "success": true,
  "data": [
    {
      "id": "6a98cb8d-35d7-47c9-8e1c-1c17f46e86f6",
      "groupId": "f4774b38-32eb-43ea-93e5-d4c83887a575",
      "fromUser": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
      "toUser": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
      "amount": "1900",
      "createdAt": "2025-12-20T11:18:41.334Z",
      "from": {
        "id": "0b069537-70db-4dc7-9d50-da2e3a1b9f4a",
        "name": "Bob Smith",
        "email": "bob@example.com"
      },
      "to": {
        "id": "be146576-6359-4813-98bc-6e7e4e3c9f1c",
        "name": "Alice Johnson Updated",
        "email": "alice@example.com"
      }
    }
  ]
}
```
