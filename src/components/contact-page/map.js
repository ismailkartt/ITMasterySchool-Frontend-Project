import React from "react";
import { config } from "../../helpers/config";

const Map = () => {
  console.log("Map URL:", config.contact.mapEmbedURL);
  return (
    <div>
      <iframe
        src={config.contact.mapEmbedURL}
        width="100%"
        height="450"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
