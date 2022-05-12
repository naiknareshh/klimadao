import React, { FC } from "react";
import dynamic from "next/dynamic";
import { KlimaInfinityLogo, ButtonPrimary } from "@klimadao/lib/components";

import { useWeb3 } from "hooks/useWeb3";
import * as styles from "./styles";

const ThemeToggle = dynamic(() => import("components/Navigation/ThemeToggle"), {
  ssr: false,
});

type Props = {
  buttons?: JSX.Element[];
};

export const PledgeLayout: FC<Props> = (props) => {
  const values = useWeb3();
  const isConnected = Boolean(values.address);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <KlimaInfinityLogo />
          </div>
          <div className={styles.group}>
            <ThemeToggle className={styles.themeToggle} />

            {props.buttons && props.buttons}

            {isConnected ? (
              <ButtonPrimary
                label={values.address}
                onClick={values.disconnect}
              />
            ) : (
              <ButtonPrimary label="Connect" onClick={values.connect} />
            )}
          </div>
        </div>
      </div>

      <>{props.children}</>
    </div>
  );
};
