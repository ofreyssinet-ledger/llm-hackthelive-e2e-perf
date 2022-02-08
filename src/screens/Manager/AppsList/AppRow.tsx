import React, { memo, useMemo } from "react";

import { View, StyleSheet } from "react-native";

import type { App } from "@ledgerhq/live-common/lib/types/manager";

import type { State, Action } from "@ledgerhq/live-common/lib/apps";
import { useNotEnoughMemoryToInstall } from "@ledgerhq/live-common/lib/apps/react";
import { Trans } from "react-i18next";
import AppIcon from "./AppIcon";

import AppStateButton from "./AppStateButton";
import ByteSize from "../../../components/ByteSize";

import { Flex, Text } from "@ledgerhq/native-ui";

type Props = {
  app: App,
  state: State,
  dispatch: (action: Action) => void,
  isInstalledView: boolean,
  setAppInstallWithDependencies: (params: { app: App, dependencies: App[] }) => void,
  setAppUninstallWithDependencies: (params: { dependents: App[], app: App }) => void,
  setStorageWarning: () => void,
  managerTabs: any,
  optimisticState: State,
};

const AppRow = ({
  app,
  state,
  dispatch,
  isInstalledView,
  setAppInstallWithDependencies,
  setAppUninstallWithDependencies,
  setStorageWarning,
  optimisticState,
}: Props) => {
  const { name, bytes, version: appVersion, displayName } = app;
  const { installed, deviceInfo } = state;

  const isInstalled = useMemo(() => installed.find(i => i.name === name), [
    installed,
    name,
  ]);

  const version = (isInstalled && isInstalled.version) || appVersion;
  const availableVersion =
    (isInstalled && isInstalled.availableVersion) || appVersion;

  const notEnoughMemoryToInstall = useNotEnoughMemoryToInstall(
    optimisticState,
    name,
  );

  const onSizePress = (name: string) => setStorageWarning(name);

  return (
    <View style={styles.root}>
      <View style={[styles.item]}>
        <AppIcon app={app} size={48} />
        <View style={styles.labelContainer}>
          <Text numberOfLines={1} variant="body" fontWeight="semiBold" color="neutral.c100">
            {displayName}
          </Text>
          <Flex style={styles.versionContainer} borderColor="neutral.c40">
            <Text numberOfLines={1} variant="tiny" color="neutral.c80" fontWeight="semiBold">
              <Trans
                  i18nKey="v3.ApplicationVersion"
                  values={{ version }}
                />
              {isInstalled && !isInstalled.updated && (
                <>
                  {" "}
                  <Trans
                    i18nKey="manager.appList.versionNew"
                    values={{
                      newVersion:
                        availableVersion !== version ? ` ${availableVersion}` : "",
                    }}
                  />
                </>
              )}
            </Text>
          </Flex>
        </View>
        <Text
          variant="body"
          fontWeight="medium"
          style={[styles.sizeText]}
          color="neutral.c70"
        >
          <ByteSize
            value={bytes}
            deviceModel={state.deviceModel}
            firmwareVersion={deviceInfo.version}
          />
        </Text>
        <AppStateButton
          app={app}
          state={state}
          dispatch={dispatch}
          notEnoughMemoryToInstall={notEnoughMemoryToInstall}
          isInstalled={!!isInstalled}
          isInstalledView={isInstalledView}
          setAppInstallWithDependencies={setAppInstallWithDependencies}
          setAppUninstallWithDependencies={setAppUninstallWithDependencies}
          storageWarning={onSizePress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 64,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 14,
    borderRadius: 0,
    height: 64,
  },
  labelContainer: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "40%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  versionContainer: {
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  sizeText: {
    marginHorizontal: 10,
  },
  warnText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  installedLabel: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 4,
    overflow: "hidden",
    paddingHorizontal: 10,
  },
  appButton: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: "auto",
    alignItems: "flex-start",
    height: 38,
    paddingHorizontal: 10,
    paddingVertical: 12,
    zIndex: 5,
  },
});

export default memo(AppRow);
