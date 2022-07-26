import { Avatar } from "@mui/material";
import React from "react";

function GenealogyTemp({ name, image, downlines }) {
  return (
    <div className="genealogy-temp">
      <Avatar
        src={image}
        alt={name}
        sx={{ width: 60, height: 60 }}
        className="genealogy-avatar__l1"
      />
      <div className="genealogy-tree__row__sub">
        {downlines.map((downline) => (
          <Avatar
            src={downline.image}
            alt={downline.name}
            key={downline.id}
            className="genealogy-avatar__l2"
            sx={{ width: 30, height: 30 }}
          />
        ))}
      </div>
    </div>
  );
}

export default GenealogyTemp;
