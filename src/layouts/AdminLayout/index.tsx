import React, { useState, useEffect } from 'react';
import { Shell, ConfigProvider } from '@alifd/next';
import GlobalSearch from '@/components/GlobalSearch';
import Notice from '@/components/Notice';
import SolutionLink from '@/components/SolutionLink';
import HeaderAvatar from '@/components/HeaderAvatar';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import accountService from '@/services/account';
import { store as appStore } from 'ice';
import PageNav from './components/PageNav';

(function () {
  const throttle = function (type: string, name: string, obj: Window = window) {
    let running = false;

    const func = () => {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  if (typeof window !== 'undefined') {
    throttle('resize', 'optimizedResize');
  }
})();

interface IGetDevice {
  (width: number): 'phone' | 'tablet' | 'desktop';
}
export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [username, setUsername] = useState('Name');
  const [systemConst, dispatchers] = appStore.useModel('systemConst');
  useEffect(() => {
    dispatchers.getWebConfig();
    setUsername(accountService.getTruename());
  }, []);
  const getDevice: IGetDevice = width => {
    const isPhone =
      typeof navigator !== 'undefined' &&
      navigator &&
      navigator.userAgent.match(/phone/gi);

    if (width < 680 || isPhone) {
      return 'phone';
    } else if (width < 1280 && width > 680) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  };

  const [device, setDevice] = useState(getDevice(NaN));

  if (typeof window !== 'undefined') {
    window.addEventListener('optimizedResize', e => {
      const deviceWidth =
        (e && e.target && (e.target as Window).innerWidth) || NaN;
      setDevice(getDevice(deviceWidth));
    });
  }

  return (
    <ConfigProvider device={device}>
      <Shell
        type="brand"
        style={{
          minHeight: '100vh',
        }}
      >
        <Shell.Branding>
          <Logo
            text={systemConst.webConfig.title}
            url="/admin"
            image={systemConst.webConfig.logo}
          />
        </Shell.Branding>
        <Shell.Navigation
          direction="hoz"
          style={{
            marginRight: 10,
          }}
        >
          <GlobalSearch />
          {/* <Clock /> */}
        </Shell.Navigation>
        <Shell.Action>
          <Notice />
          <SolutionLink
            url="/"
            title=""
            icon="favorites-filling"
          />
          <HeaderAvatar
            name={username}
          />
        </Shell.Action>
        <Shell.Navigation>
          <PageNav />
        </Shell.Navigation>

        <Shell.Content>{children}</Shell.Content>
        <Shell.Footer>
          <Footer
            image={systemConst.webConfig.logo}
            copyright={systemConst.webConfig.copyright}
            text={systemConst.webConfig.title}
          />
        </Shell.Footer>
      </Shell>
    </ConfigProvider>
  );
}
