import { UlmDslService } from "../src/ulm-dsl-service";
import { UlmDslClient } from "../src/ulm-dsl-client";

describe("UlmDslService", () => {
  it("test", async () => {
    const service = new UlmDslService();
    await service.fetchMailFeed("max.mustermann", 1234).then((x) => {
      console.debug(x);
      expect(true).toBe(true);
    });
  });

  it("test2", async () => {
    const service = new UlmDslService();
    await service.fetchInboxFeed("max.mustermann").then((x) => {
      console.debug(x);
      expect(true).toBe(true);
    });
  });
});
