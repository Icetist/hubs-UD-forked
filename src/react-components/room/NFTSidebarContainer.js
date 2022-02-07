import React, { useState } from "react";
import PropTypes from "prop-types";
import { NFTSidebar } from "./NFTSidebar";
import { SelectInputField } from "../input/SelectInputField";
import { FormattedMessage } from "react-intl";
import styles from "./ObjectsSidebar.scss";
import { MediaTile } from "./MediaTiles";
import { MediaGrid } from "./MediaGrid";
const entry = {
  images: {
    preview: {
      height: 1280,
      url: "https://hubs-upload-cdn.com/files/4c088350-cf3c-44ad-94d4-62a787d95ced.png",
      width: 720
    }
  },
  name: "Purp Derp",
  type: "nft_listing",
  
};

function SelectProperty({ options, onChange, children }) {
  const [value, setValue] = useState("Ethereum");
  return (
    <div>
      <span style={{ flex: "none", padEnd: "10px" }}>{children}</span>
      <SelectInputField
        className={styles.marginNetwork}
        value={value}
        options={options}
        onChange={newValue => {
          setValue(newValue);
          onChange(newValue);
        }}
      />
    </div>
  );
}

SelectProperty.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  children: PropTypes.node
};

export function NFTSidebarContainer({ onClose }) {
  return (
    <NFTSidebar onClose={onClose}>
      <div style={{ margin: "5px", display: "flex", width: "100%", justifyContent: "center", alignContent: "center" }}>
        <SelectProperty
          options={["Ethereum", "Polygon"]}
          onChange={value => {
            console.log(value);
          }}
        >
          <FormattedMessage id="coki" defaultMessage="Network" />
        </SelectProperty>
        <MediaGrid
              isVariableWidth={true}
              sm={true}
            >
      <MediaTile entry={entry} processThumbnailUrl={() => entry.images.preview.url} />
      <MediaTile entry={entry} processThumbnailUrl={() => entry.images.preview.url} />
      <MediaTile entry={entry} processThumbnailUrl={() => entry.images.preview.url} />
      <MediaTile entry={entry} processThumbnailUrl={() => entry.images.preview.url} />
            </MediaGrid>
      </div>
   
      
    </NFTSidebar>
  );
}

NFTSidebarContainer.propTypes = {
  onClose: PropTypes.func
};
