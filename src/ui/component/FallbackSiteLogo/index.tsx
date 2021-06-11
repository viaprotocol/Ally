import React, { useState, useEffect, useMemo } from 'react';
import { getOriginName, hashCode } from 'ui/utils';
import './style.less';

const bgColorList = [
  '#F69373',
  '#91D672',
  '#C0E36C',
  '#A47CDF',
  '#6BD5D6',
  '#ED7DBC',
  '#7C93EF',
  '#65BBC0',
  '#6EB7FB',
  '#6091CD',
  '#F6B56F',
  '#DFA167',
];

const FallbackImage = ({
  url,
  origin,
  width,
  height,
  style = {},
}: {
  url: string;
  origin: string;
  width: string;
  height: string;
  style?: React.CSSProperties;
}) => {
  const [loadFaild, setLoadFaild] = useState(false);
  const [loadSuccess, setLoadSuccess] = useState(false);

  const [bgColor, originName] = useMemo(() => {
    const bgIndex = Math.abs(hashCode(origin) % 12);

    return [bgColorList[bgIndex].toLowerCase(), getOriginName(origin)];
  }, [url]);

  const handleImageLoadError = () => {
    setLoadFaild(true);
  };

  const handleImageLoadSuccess = () => {
    setLoadSuccess(true);
  };

  useEffect(() => {
    if (!url) setLoadFaild(true);
  }, [url]);

  const bgText = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text x='11' y='22' fill='white' font-size='15' font-weight='500'>${originName[0].toUpperCase()}</text></svg>")`;

  return (
    <div
      className="fallback-site-logo"
      style={{
        backgroundColor: loadSuccess ? 'transparent' : bgColor,
        backgroundImage: loadSuccess ? 'none' : bgText,
        width,
        height,
        ...style,
      }}
    >
      {!loadFaild && (
        <img
          src={url}
          alt={origin}
          className="transition-opacity"
          style={{
            width,
            height,
            opacity: loadSuccess ? '1' : '0',
            ...style,
          }}
          onLoad={handleImageLoadSuccess}
          onError={handleImageLoadError}
        />
      )}
    </div>
  );
};

export default FallbackImage;
