// @flow

import React, { Component } from "react";
import { Trans } from "react-i18next";
import { connect } from "react-redux";
import { View, StyleSheet, Image } from "react-native";
import { createStructuredSelector } from "reselect";
import Icon from "react-native-vector-icons/dist/Feather";
import type { Privacy } from "../../../reducers/settings";
import { privacySelector } from "../../../reducers/settings";
import Circle from "../../../components/Circle";
import LText from "../../../components/LText";
import Button from "../../../components/Button";
import BiometricsRow from "../../Settings/General/BiometricsRow";
import colors from "../../../colors";
import OnboardingLayout from "../OnboardingLayout";
import { withOnboardingContext } from "../onboardingContext";
import type { OnboardingStepProps } from "../types";

const illustration = (
  <Image source={require("../assets/password-illustration.png")} />
);

export const Success = () => (
  <View style={styles.success}>
    <Circle size={24} bg={colors.green}>
      <Icon size={16} color={colors.white} name="check" />
    </Circle>
  </View>
);

class OnboardingStepPassword extends Component<
  OnboardingStepProps & {
    privacy: Privacy,
  },
> {
  navigateToPassword = () => {
    this.props.navigation.navigate("PasswordAdd");
  };

  Footer = () => {
    const { next, privacy } = this.props;

    return privacy.authSecurityEnabled ? (
      <Button
        type="primary"
        title={<Trans i18nKey="common.continue" />}
        onPress={next}
      />
    ) : (
      <Button
        type="primary"
        title={<Trans i18nKey="onboarding.stepPassword.setPassword" />}
        onPress={this.navigateToPassword}
      />
    );
  };

  render() {
    const { privacy } = this.props;
    return (
      <OnboardingLayout
        header="OnboardingStepPassword"
        Footer={this.Footer}
        withSkip
      >
        <View style={styles.hero}>
          {illustration}
          {privacy.authSecurityEnabled ? <Success /> : null}
        </View>
        <LText style={styles.desc}>
          <Trans
            i18nKey={
              privacy.authSecurityEnabled
                ? "onboarding.stepPassword.descConfigured"
                : "onboarding.stepPassword.desc"
            }
          />
        </LText>
        {privacy.authSecurityEnabled ? <BiometricsRow /> : null}
      </OnboardingLayout>
    );
  }
}

const styles = StyleSheet.create({
  hero: {
    paddingTop: 16,
    paddingBottom: 24,
    alignSelf: "center",
  },
  success: {
    position: "absolute",
    top: 24,
    right: 4,
  },
  desc: {
    textAlign: "center",
    color: colors.smoke,
    fontSize: 14,
    lineHeight: 21,
    paddingHorizontal: 24,
    marginBottom: 48,
  },
});

export default withOnboardingContext(
  connect(
    createStructuredSelector({
      privacy: privacySelector,
    }),
  )(OnboardingStepPassword),
);
