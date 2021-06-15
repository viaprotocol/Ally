import React from 'react';
import { useState, useEffect } from 'react';
import { PageHeader, Field, FallbackSiteLogo } from 'ui/component';
import { SvgIconCross } from 'ui/assets';
import { useWallet } from 'ui/utils';
import { ConnectedSite } from 'background/service/permission';
import './style.less';

const ConnectedSites = () => {
  const [sites, setSites] = useState<ConnectedSite[]>([]);
  const wallet = useWallet();

  const getSites = async () => {
    const sites = await wallet.getConnectedSites();
    setSites(sites);
  };

  useEffect(() => {
    getSites();
  }, []);

  const handleRemove = (origin: string) => {
    wallet.removeConnectedSite(origin);
    getSites();
  };

  const NoDataUI = (
    <div className="no-site">
      <img
        className="no-data-image"
        src="/images/nodata-site.png"
        alt="no site"
      />
      <p className="text-gray-content text-14">No data</p>
    </div>
  );

  return (
    <div className="connected-sites">
      <PageHeader>Connected Sites</PageHeader>
      {sites.length > 0
        ? sites.map((site) => (
            <Field
              className="border hover:border-blue transition-colors border-white"
              key={site.origin}
              leftIcon={
                <div className="icon icon-site">
                  <FallbackSiteLogo
                    url={site.icon}
                    origin={site.origin}
                    width="32px"
                    height="32px"
                    style={{ borderRadius: '4px' }}
                  />
                </div>
              }
              rightIcon={
                <SvgIconCross
                  className="cross-icon w-8 fill-current text-gray-comment cursor-pointer"
                  onClick={() => handleRemove(site.origin)}
                />
              }
            >
              <div className="site-info">
                <p className="text-13 font-medium text-gray-title">
                  {site.origin}
                </p>
                <p className="text-12 text-gray-content">{site.name}</p>
              </div>
            </Field>
          ))
        : NoDataUI}
    </div>
  );
};

export default ConnectedSites;
