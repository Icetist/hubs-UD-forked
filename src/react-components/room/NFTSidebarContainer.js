import React, { useState } from "react";
import PropTypes from "prop-types";
import { NFTSidebar } from "./NFTSidebar";
import { SelectInputField } from "../input/SelectInputField";
import { FormattedMessage } from "react-intl";
import styles from "./ObjectsSidebar.scss";
import { MediaTile } from "./MediaTiles";
import { MediaGrid } from "./MediaGrid";
import {uauth} from '../connector'
import configs from "../../utils/configs";

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
async function fetchMetadata(url){
  const res = await fetch(url);
  return res.json();
}
async function fetchNFT(network) {
  const address=(await uauth.uauth.user()).wallet_address
  const res = await fetch(
    `https://deep-index.moralis.io/api/v2/${address}/nft?chain=${network}&format=decimal`,
    {
      headers: {
        "X-API-Key": configs.MORALIS_KEY
      }
    }
  );
  const data=(await res.json()).result;
  const allData=data.map(async ({token_uri,...rest})=>{
    const image=await fetchMetadata(token_uri)
    let svgImage,svgFile;

    if(image.image_data){
      let blob = new Blob([image.image_data], {type: 'image/svg+xml'});
      let url = URL.createObjectURL(blob);
      svgImage=url;
      svgFile=new File([blob], "snap.svg", { type: "image/svg+xml" });
    }
    
    return {svg:image.image_data?svgFile:false,image:image.image_data?svgImage:image.image,...rest};
  });
  // console.log(allData)
  return await (Promise.all(allData));
}

export function NFTSidebarContainer({ onClose, scene }) {
  const [nft, setNft] = useState([]);
  const [network, setNetwork] = useState("eth");
  return (
    <NFTSidebar onClose={onClose}>
      <div style={{ margin: "5px", display: "flex", width: "100%", justifyContent: "center", alignContent: "center" }}>
        <SelectProperty
          options={["Ethereum", "Polygon"]}
          onChange={async value => {
            const data=await fetchNFT(value === "Ethereum" ? "eth" : "polygon")
            console.log(data)
            if(data) setNft(data);
            setNetwork(value === "Ethereum" ? "eth" : "matic");
            
          }}
        >
          <FormattedMessage id="coki" defaultMessage="Network" />
        </SelectProperty>
        <MediaGrid isVariableWidth={true} sm={true}>
          
          {nft.map(a => 
            
            <MediaTile
            onSeeNFT={()=>window.open(`https://opensea.io/assets/${network === "eth" ? "" : "matic/"}${a.token_address}/${a.token_id}`)}
              onClick={() =>
                scene.emit("add_nft", {
                  src: a.svg?a.svg:a.image,
                  openseaURL: `https://opensea.io/assets/${network === "eth" ? "" : "matic/"}${a.token_address}/${a.token_id}`
                })
              }
              entry={{name:a.name,type:"nft_listing",images: {
                preview: {
                  height: 300,
                  url: a.image,
                  width: 800
                }
              }}}
              processThumbnailUrl={() => a.image}
           
            />)
          }
        </MediaGrid>
      </div>
    </NFTSidebar>
  );
}

NFTSidebarContainer.propTypes = {
  onClose: PropTypes.func
};
