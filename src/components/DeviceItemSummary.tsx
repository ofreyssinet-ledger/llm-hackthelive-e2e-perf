import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Trans } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import { deviceNameByDeviceIdSelectorCreator } from "../reducers/ble";
import Circle from "./Circle";
import Touchable from "./Touchable";
import LText from "./LText";
import IconNanoX from "../icons/NanoX";
import Alert from "../icons/Alert";
import { Text } from "@ledgerhq/native-ui";
import { CircledCheckMedium } from "@ledgerhq/native-ui/assets/icons";
import styled from "styled-components/native";

type Props = {
  deviceId: string;
  genuine: boolean;
  onEdit: () => void;
};

export default function DeviceItemSummary({
  genuine,
  onEdit,
  deviceId,
}: Props) {
  const { colors } = useTheme();
  const name = useSelector(deviceNameByDeviceIdSelectorCreator(deviceId));

  return (
    <View style={[styles.root, { borderColor: colors.fog }]}>
      <IconNanoX color={colors.darkBlue} height={36} width={8} />
      <View style={styles.content}>
        <LText bold numberOfLines={1} style={styles.deviceNameText}>
          {name}
        </LText>
        {genuine ? (
          <View style={styles.genuine}>
            <Text variant={'body'} fontWeight={'medium'} color={'neutral.c80'} numberOfLines={1}><Trans i18nKey="DeviceItemSummary.genuine" />kyufkfyf</Text>
            <CircledCheckMedium size={16} color={'success.c80'}></CircledCheckMedium>
          </View>
        ) : (
          <View style={styles.genuine}>
            <LText
              numberOfLines={1}
              style={[styles.genuineText, styles.genuineFailed]}
              color="smoke"
            >
              <Trans i18nKey="DeviceItemSummary.genuineFailed">
                {"Genuine check "}
                <LText semiBold>failed</LText>
              </Trans>
            </LText>
            <Circle bg={colors.yellow} size={14}>
              <Alert size={10} color={colors.white} />
            </Circle>
          </View>
        )}
      </View>
      <Touchable event="DeviceItemEdit" onPress={onEdit}>
        <LText bold numberOfLines={1} style={styles.editText} color="live">
          <Trans i18nKey="common.rename" />
        </LText>
      </Touchable>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginBottom: 16,
  },
  root: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  content: {
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    marginLeft: 24,
  },
  deviceNameText: {
    fontSize: 16,
    paddingRight: 8,
  },
  genuine: {
    paddingTop: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  genuineText: {
    fontSize: 14,
  },
  genuineFailed: {
    marginRight: 6,
  },
  editText: {
    fontSize: 14,
  },
});
