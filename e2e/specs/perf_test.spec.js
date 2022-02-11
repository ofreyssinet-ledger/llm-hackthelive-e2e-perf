// @flow
import { cleanLaunch, bridge } from "../engine";

import { $waitFor, $retryUntilItWorks } from "../engine/utils";

const { device, element, by, waitFor } = require("detox");

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

describe("Mobile E2E Test Engine", () => {
  describe("Bridge", () => {
    describe("loadConfig", () => {
      beforeAll(async () => {
        await cleanLaunch();
      });

      it("should import accounts", async () => {
        const initialTime = Date.now();

        await device.disableSynchronization();

        await $retryUntilItWorks(async () => {
          await bridge.loadConfig("allLiveCoinsNoOperations", true);
        });

        await $retryUntilItWorks(async () => {
          const accountTabButton = element(by.id("TabBarAccounts"));
          await waitFor(accountTabButton)
            .toBeVisible();
          await wait(1000);
          await accountTabButton.tap();
        });

        await $retryUntilItWorks(async () => {
          const firstAccountButton = element(by.text("Komodo 1"));
          await waitFor(firstAccountButton)
            .toBeVisible();
          await firstAccountButton.tap();
        });

        await device.enableSynchronization();

        console.log(
          `Test finished, took ${(Date.now() - initialTime) /
            1000}s to execute`,
        );
      });
    });
  });
});
