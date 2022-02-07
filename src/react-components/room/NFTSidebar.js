import React from "react";
import PropTypes from "prop-types";
import { Sidebar } from "../sidebar/Sidebar";
import { CloseButton } from "../input/CloseButton";
import { FormattedMessage } from "react-intl";



export function NFTSidebar({ children,  onClose }) {
  return (
    <Sidebar
      title={
        <FormattedMessage
          id="objects-sidebar.title"
          defaultMessage="NFT"
     
        />
      }
      beforeTitle={<CloseButton onClick={onClose} />}
    >
      <ul>{children}</ul>
    </Sidebar>
  );
}

NFTSidebar.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
};


