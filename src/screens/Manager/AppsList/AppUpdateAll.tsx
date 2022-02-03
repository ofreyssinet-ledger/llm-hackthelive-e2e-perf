import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import type { Action, State } from "@ledgerhq/live-common/lib/apps";
import { Trans } from "react-i18next";

import styled, { useTheme } from "styled-components/native";
import UpdateAllModal from "../Modals/UpdateAllModal";
import LText from "../../../components/LText";
import Touchable from "../../../components/Touchable";
import Info from "../../../icons/Info";
import AppUpdateStepper from "./AppUpdateStepper";

type Props = {
  state: State,
  appsToUpdate: App[],
  dispatch: (action: Action) => void,
  isModalOpened?: boolean,
};

const AppUpdateCard = styled.View`
  border-radius: 8px;
  padding: 16px;
  background-color: ${p => p.theme.colors.neutral.c30};
`;

const AppUpdateAll = ({
  state,
  appsToUpdate,
  dispatch,
  isModalOpened,
}: Props) => {
  const { colors } = useTheme();
  const { updateAllQueue } = state;
  const [modalOpen, setModalOpen] = useState(isModalOpened);

  const openModal = useCallback(() => setModalOpen(true), [setModalOpen]);
  const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
  const appsList = appsToUpdate.map(({ name }) => name);
  const updateAll = useCallback(() => {
    dispatch({ type: "updateAll" });
    setModalOpen(false);
  }, [dispatch]);

  return (
    <>
      {appsToUpdate.length > 0 && updateAllQueue.length <= 0 && (
        <AppUpdateCard>
          <AppUpdateStepper state={state} />
          <View style={styles.root}>
            <Touchable
              style={styles.infoLabel}
              activeOpacity={0.5}
              onPress={openModal}
              event="ManagerAppUpdateModalOpen"
            >
              <LText semiBold style={styles.infoText} color="live">
                <Trans
                  i18nKey="AppAction.update.title"
                  count={appsToUpdate.length}
                  values={{ number: appsToUpdate.length }}
                />
              </LText>
              <Info size={17} color={colors.live} />
            </Touchable>
            <Touchable
              style={[styles.button, { backgroundColor: colors.live }]}
              onPress={updateAll}
              event="ManagerAppUpdateAll"
              eventProperties={{ appName: appsList }}
            >
              <LText semiBold style={[styles.buttonText, { color: "#FFF" }]}>
                <Trans i18nKey="AppAction.update.button" />
              </LText>
            </Touchable>
            <UpdateAllModal
              isOpened={modalOpen}
              installed={state.installed}
              apps={appsToUpdate}
              onClose={closeModal}
              onConfirm={updateAll}
              state={state}
            />
          </View>
        </AppUpdateCard>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoLabel: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 38,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 17,
    marginRight: 6,
  },
  button: {
    flexBasis: "auto",
    alignItems: "center",
    justifyContent: "center",
    height: 38,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 14,
  },
});

export default AppUpdateAll;