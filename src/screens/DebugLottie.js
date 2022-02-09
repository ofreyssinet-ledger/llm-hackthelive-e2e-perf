// @flow

import React, { useMemo, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { useTheme } from "@react-navigation/native";
import Config from "react-native-config";
import Button from "../components/Button";
import LText from "../components/LText";
import Animation from "../components/Animation";
import getDeviceAnimation from "../components/DeviceAction/getDeviceAnimation";
import BottomModal from "../components/BottomModal";
import Touchable from "../components/Touchable";
import Alert from "../components/Alert";
import Check from "../icons/Check";
import { lottieAnimations } from "./Onboarding/shared/infoPagesData";

const forceInset = { bottom: "always" };

const DebugLottie = () => {
  const { colors } = useTheme();

  const keys = useMemo(
    () => [
      "plugAndPinCode",
      "enterPinCode",
      "quitApp",
      "allowManager",
      "openApp",
      "validate",
    ],
    [],
  );
  const onBoardingKeys = useMemo(
    () => [
      "pinCode",
      "recover",
      "confirmWords",
      "numberOfWords",
      "powerOn",
      "powerOnRecovery",
    ],
    [],
  );

  const [modelId, setModelId] = useState(Config.OVERRIDE_MODEL_ID);
  const [wired, setWired] = useState(false);
  const [key, setKey] = useState<any>("enterPinCode");
  const [keyModalVisible, setKeyModalVisible] = useState(false);
  const animation = useMemo(() => {
    if (keys.includes(key)) {
      // Normal deviceAction animations
      return getDeviceAnimation({
        device: { modelId, wired: wired && modelId === "nanoX" },
        key,
        theme: "light",
      });
    }
    if (onBoardingKeys.includes(key)) {
      return lottieAnimations[modelId][key];
    }
    return null;
    // Onboarding animations
  }, [key, keys, modelId, onBoardingKeys, wired]);

  const animation2 = useMemo(() => {
    if (keys.includes(key)) {
      // Normal deviceAction animations
      return getDeviceAnimation({
        device: { modelId, wired: wired && modelId === "nanoX" },
        key,
        theme: "dark",
      });
    }
    if (onBoardingKeys.includes(key)) {
      return lottieAnimations[modelId][key];
    }
    return null;
    // Onboarding animations
  }, [key, keys, modelId, onBoardingKeys, wired]);

  const allKeys = [...keys, ...onBoardingKeys];
  return (
    <SafeAreaView
      forceInset={forceInset}
      style={[styles.root, { backgroundColor: colors.background }]}
    >
      <Alert type="warning">
        {
          "This is a tool provided as-is for the team to validate lottie animations used in the app."
        }
      </Alert>
      <LText secondary semiBold style={styles.title}>
        {!key ? "Select Animation" : `Showing '${key}'`}
      </LText>
      <View style={{ borderWidth: 1 }}>
        <Animation source={animation} />
      </View>
      <View style={{ backgroundColor: "#121212" }}>
        <Animation source={animation2} />
      </View>
      <View style={styles.select}>
        <Button
          type="primary"
          title="nanoS"
          disabled={Config.OVERRIDE_MODEL_ID}
          onPress={() => {
            setModelId("nanoS");
          }}
        />
        <Button
          type="primary"
          title="nanoSP"
          disabled={Config.OVERRIDE_MODEL_ID}
          onPress={() => {
            setModelId("nanoSP");
          }}
        />
        <Button
          type="primary"
          title="nanoX"
          disabled={Config.OVERRIDE_MODEL_ID}
          onPress={() => {
            setModelId("nanoX");
          }}
        />
        <Button
          type="primary"
          title="blue"
          disabled={Config.OVERRIDE_MODEL_ID}
          onPress={() => {
            setModelId("blue");
          }}
        />
      </View>
      <Button
        containerStyle={{ marginTop: 8 }}
        type="primary"
        title="Toggle wired"
        disabled={modelId !== "nanoX"}
        onPress={() => setWired(wired => !wired)}
      />
      <Button
        containerStyle={{ marginTop: 8 }}
        type="primary"
        title="Animation key"
        onPress={() => setKeyModalVisible(true)}
      />
      <BottomModal isOpened={keyModalVisible} onClose={setKeyModalVisible}>
        <ScrollView style={styles.modal}>
          {allKeys.map((_key, i) => (
            <Touchable
              key={_key + i}
              onPress={() => {
                setKey(_key);
                setKeyModalVisible(false);
              }}
              style={[styles.button]}
            >
              <LText
                {...(key === _key ? { semiBold: true } : {})}
                style={[styles.buttonLabel]}
              >
                {_key}
              </LText>
              {key === _key && <Check size={16} color={colors.live} />}
            </Touchable>
          ))}
        </ScrollView>
      </BottomModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 8,
  },
  anim: {
    flex: 1,
  },
  title: {
    margin: 16,
    textAlign: "center",
  },
  select: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    height: 50,
    margin: 8,
    borderRadius: 4,
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 8,
    flexDirection: "row",
  },
  buttonLabel: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  modal: { padding: 8 },
});

export default DebugLottie;
