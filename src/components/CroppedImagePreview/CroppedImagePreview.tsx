import { Avatar, Box } from "@mui/material";
import React from "react";
import { Area } from "react-easy-crop";
import Image from "mui-image";

type CroppedImagePreviewProps = {
  croppedArea: Area;
  src: string;
  size?: number;
};

const CROP_AREA_ASPECT = 1;

const CroppedImagePreview = ({
  croppedArea,
  src,
  size = 90,
}: CroppedImagePreviewProps) => {
  const scale = 100 / croppedArea.width;
  const transform = {
    x: `${-croppedArea.x * scale}%`,
    y: `${-croppedArea.y * scale}%`,
    scale,
    width: "calc(100% + 0.5px)",
    height: "auto",
  };

  const imageStyle = {
    transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
    width: transform.width,
    height: transform.height,
  };

  return (
    <Box
      sx={{
        overflow: "hidden",
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
      }}
    >
      <Avatar
        sx={[
          imageStyle,
          {
            position: "absolute",
            top: 0,
            left: 0,
            transformOrigin: "top left",
            width: size,
            height: size,
            borderRadius: 0,
          },
        ]}
        src={src}
      />
    </Box>
  );

  //   <Image src={src} style={imageStyle} />
};

export default CroppedImagePreview;
