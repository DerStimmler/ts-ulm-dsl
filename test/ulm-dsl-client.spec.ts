import { UlmDslClient } from "../src/ulm-dsl-client";
import {
  emptyInboxXml,
  inboxXml,
  invalidId4Xml,
  singleMail4305,
  singleMail4305Xml,
  singleMail5267,
  singleMail5267Xml,
} from "./response-mocks";

describe("UlmDslClient", () => {
  it("getInbox", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: inboxXml.status,
        json: () => Promise.resolve(inboxXml.data),
      }),
    );

    const client = new UlmDslClient();
    const inbox = await client.getInbox("max.mustermann");

    expect(inbox).toHaveLength(2);
    expect(inbox).toStrictEqual(inbox);
  });

  it("emptyInbox", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: emptyInboxXml.status,
        json: () => Promise.resolve(emptyInboxXml.data),
      }),
    );

    const client = new UlmDslClient();
    const inbox = await client.getInbox("max.mustermann");

    expect(inbox).toHaveLength(0);
  });

  it("getMailById", async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: inboxXml.status,
          json: () => Promise.resolve(inboxXml.data),
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: singleMail5267Xml.status,
          json: () => Promise.resolve(singleMail5267Xml.data),
        }),
      );

    const client = new UlmDslClient();
    const mail = await client.getMailById("max.mustermann", 5267);

    expect(mail).toStrictEqual(singleMail5267);
  });

  it("getMails", async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: inboxXml.status,
          json: () => Promise.resolve(inboxXml.data),
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: singleMail5267Xml.status,
          json: () => Promise.resolve(singleMail5267Xml.data),
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: singleMail4305Xml.status,
          json: () => Promise.resolve(singleMail4305Xml.data),
        }),
      );

    const client = new UlmDslClient();
    const mails = await client.getMails("max.mustermann");

    expect(mails).toHaveLength(2);
    expect(mails).toContainEqual(singleMail5267);
    expect(mails).toContainEqual(singleMail4305);
  });

  it("invalidId", async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: inboxXml.status,
          json: () => Promise.resolve(inboxXml.data),
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: invalidId4Xml.status,
          json: () => Promise.resolve(invalidId4Xml.data),
        }),
      );

    const client = new UlmDslClient();
    const mail = await client.getMailById("max.mustermann", 4);

    expect(mail).toStrictEqual(null);
  });

  it("invalidName", async () => {
    const client = new UlmDslClient();
    const result = async () => await client.getMailById("", 4);
    await expect(result()).rejects.toThrow("Invalid name.");
    const result2 = async () => await client.getMails("");
    await expect(result2()).rejects.toThrow("Invalid name.");
    const result3 = async () => await client.getInbox("");
    await expect(result3()).rejects.toThrow("Invalid name.");
  });
});
