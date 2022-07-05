# ts-ulm-dsl

[![npm version](https://img.shields.io/npm/v/ts-ulm-dsl.svg)](https://www.npmjs.org/package/ts-ulm-dsl/)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/DerStimmler/ts-ulm-dsl/blob/master/LICENSE.md)

Typescript library for fetching emails from the temp mail service [ulm-dsl](https://ulm-dsl.de/).

## Installation

Available on [npm](https://www.npmjs.org/package/ts-ulm-dsl/).

```bash
npm install ts-ulm-dsl
```

## Usage

The following examples use the email address `max.mustermann@ulm-dsl.de`. Just replace the inbox name `max.mustermann` to match your address.

### Initialization

```typescript
//TODO
```

### Get Inbox

You can fetch the basic information **except the body** for all emails in an inbox by calling the `getInbox` method and passing the inbox name.

```typescript
//TODO
```

### Get Mail by Id

You can get all available information for a specific email by calling the `getMailById` method and passing the inbox name and email identifier.

```typescript
//TODO
```

### Get Mails

You can get all available information for all emails in an inbox by calling the `getMails` method and passing the inbox name.

```typescript
//TODO
```

### API rate limits

The api is limited to about 100 requests per minute. So you should keep in mind when this client fires requests:

- When you fetch your inbox only a single request gets fired.
- When you fetch a specific email by id, two requests get fired. One for the basic information e.g. the sender and receiver and one for the email body.
- When you fetch all emails a first request gets fired for the basic information of all emails and then another request per email to retrieve each email body.

So based on your inbox size you should think twice before you fetch all emails. Maybe it's better to just fetch the inbox and then retrieve a single email by id.
