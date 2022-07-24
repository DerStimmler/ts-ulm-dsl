import { UlmDslClient } from "../src/ulm-dsl-client";
import axios from "axios";
import {
  emptyInboxXml,
  inboxXml,
  invalidId4Xml,
  singleMail4305,
  singleMail4305Xml,
  singleMail5267,
  singleMail5267Xml,
} from "./response-mocks";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("UlmDslClient", () => {
  it("getInbox", async () => {
    mockedAxios.get.mockResolvedValueOnce(inboxXml);

    const client = new UlmDslClient();
    const inbox = await client.getInbox("max.mustermann");

    expect(inbox).toHaveLength(2);
    expect(inbox).toStrictEqual(inbox);
  });

  it("emptyInbox", async () => {
    mockedAxios.get.mockResolvedValueOnce(emptyInboxXml);

    const client = new UlmDslClient();
    const inbox = await client.getInbox("max.mustermann");

    expect(inbox).toHaveLength(0);
  });

  it("getMailById", async () => {
    mockedAxios.get.mockResolvedValueOnce(inboxXml);
    mockedAxios.get.mockResolvedValueOnce(singleMail5267Xml);

    const client = new UlmDslClient();
    const mail = await client.getMailById("max.mustermann", 5267);

    expect(mail).toStrictEqual(singleMail5267);
  });

  it("getMails", async () => {
    mockedAxios.get.mockResolvedValueOnce(inboxXml);
    mockedAxios.get.mockResolvedValueOnce(singleMail5267Xml);
    mockedAxios.get.mockResolvedValueOnce(singleMail4305Xml);

    const client = new UlmDslClient();
    const mails = await client.getMails("max.mustermann");

    expect(mails).toHaveLength(2);
    expect(mails).toContainEqual(singleMail5267);
    expect(mails).toContainEqual(singleMail4305);
  });

  it("invalidId", async () => {
    mockedAxios.get.mockResolvedValueOnce(inboxXml);
    mockedAxios.get.mockResolvedValueOnce(invalidId4Xml);

    const client = new UlmDslClient();
    const mail = await client.getMailById("max.mustermann", 4);

    expect(mail).toStrictEqual(null);
  });

  it("invalidName", async () => {
    const client = new UlmDslClient();
    const result = async () => await client.getMailById("", 4);
    await expect(result()).rejects.toThrowError("Invalid name.");
    const result2 = async () => await client.getMails("");
    await expect(result2()).rejects.toThrowError("Invalid name.");
    const result3 = async () => await client.getInbox("");
    await expect(result3()).rejects.toThrowError("Invalid name.");
  });
});
