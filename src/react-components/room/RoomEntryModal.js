import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Modal } from "../modal/Modal";
import { Button } from "../input/Button";
import { ReactComponent as EnterIcon } from "../icons/Enter.svg";
import { ReactComponent as VRIcon } from "../icons/VR.svg";
import { ReactComponent as ShowIcon } from "../icons/Show.svg";
import { ReactComponent as SettingsIcon } from "../icons/Settings.svg";
import { ReactComponent as HmcLogo } from "../icons/HmcLogo.svg";
import styles from "./RoomEntryModal.scss";
import styleUtils from "../styles/style-utils.scss";
import { useCssBreakpoints } from "react-use-css-breakpoints";
import { Column } from "../layout/Column";
import { FormattedMessage } from "react-intl";
import configs from "../../utils/configs";
import LOGO from "../../assets/images/Unstoppable Domains-Sign-Mono-Dark.svg";
import { useWeb3React } from "@web3-react/core";

import { uauth } from "../connector";
export function RoomEntryModal({
  appName,
  logoSrc,
  className,
  roomName,
  showJoinRoom,
  onJoinRoom,
  onJoinUnstoppable,
  showEnterOnDevice,
  onEnterOnDevice,
  showSpectate,
  onSpectate,
  showOptions,
  onOptions,
  ...rest
}) {
  const { activate } = useWeb3React();

  const breakpoint = useCssBreakpoints();
  const isHmc = configs.feature("show_cloud");
  const [bgColor, setBgColor] = useState("#4b47ee");
 

  return (
    <Modal className={classNames(styles.roomEntryModal, className)} disableFullscreen {...rest}>
      <Column center className={styles.content}>
        {breakpoint !== "sm" &&
          breakpoint !== "md" && (
            <div className={styles.logoContainer}>
              {isHmc ? <HmcLogo className="hmc-logo" /> : <img src={logoSrc} alt={appName} />}
            </div>
          )}
        <div className={styles.roomName}>
          <h5>
            <FormattedMessage id="room-entry-modal.room-name-label" defaultMessage="Room Name" />
          </h5>
          <p>{roomName}</p>
        </div>
        <Column center className={styles.buttons}>
          <Button
            preset="accent4"
            onClick={async () => {
              try {
                await activate(uauth);
             
                const authorization = await uauth.uauth.user();
                if (authorization) {
                  onJoinUnstoppable(true, authorization);
                }
              } catch (e) {
                console.log(e.message);
                onJoinUnstoppable(false, null);
              }
            }}
            style={{ backgroundColor: bgColor, width: "200px" }}
            onMouseEnter={() => setBgColor("#0b24b3")}
            onMouseLeave={() => setBgColor("#4b47ee")}
            onMouseDown={() => setBgColor("#5361c7")}
            onMouseUp={() => setBgColor("#4b47ee")}
          >
            <img style={{ height: "20px" }} src={LOGO} alt="UD Logo" /> Login with Unstoppable
          </Button>
          {showJoinRoom && (
            <Button preset="accent4" onClick={onJoinRoom}>
              <EnterIcon />
              <span>
                <FormattedMessage id="room-entry-modal.join-room-button" defaultMessage="Join Room" />
              </span>
            </Button>
          )}
          {showEnterOnDevice && (
            <Button preset="accent5" onClick={onEnterOnDevice}>
              <VRIcon />
              <span>
                <FormattedMessage id="room-entry-modal.enter-on-device-button" defaultMessage="Enter On Device" />
              </span>
            </Button>
          )}
          {showSpectate && (
            <Button preset="accent2" onClick={onSpectate}>
              <ShowIcon />
              <span>
                <FormattedMessage id="room-entry-modal.spectate-button" defaultMessage="Spectate" />
              </span>
            </Button>
          )}
          {showOptions &&
            breakpoint !== "sm" && (
              <>
                <hr className={styleUtils.showLg} />
                <Button preset="transparent" className={styleUtils.showLg} onClick={onOptions}>
                  <SettingsIcon />
                  <span>
                    <FormattedMessage id="room-entry-modal.options-button" defaultMessage="Options" />
                  </span>
                </Button>
              </>
            )}
        </Column>
      </Column>
    </Modal>
  );
}

RoomEntryModal.propTypes = {
  appName: PropTypes.string,
  logoSrc: PropTypes.string,
  className: PropTypes.string,
  roomName: PropTypes.string.isRequired,
  showJoinRoom: PropTypes.bool,
  onJoinRoom: PropTypes.func,
  showEnterOnDevice: PropTypes.bool,
  onEnterOnDevice: PropTypes.func,
  showSpectate: PropTypes.bool,
  onSpectate: PropTypes.func,
  showOptions: PropTypes.bool,
  onOptions: PropTypes.func
};

RoomEntryModal.defaultProps = {
  showJoinRoom: true,
  showEnterOnDevice: true,
  showSpectate: true,
  showOptions: true
};
