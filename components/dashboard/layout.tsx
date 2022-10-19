import React from 'react';
import { useLockedBody } from '../hooks/useBodyLock';
import { SidebarContext } from '../layout/layout-context';
import {WrapperLayout} from '../layout/layout.styles';
import { NavbarWrapper } from '../navbar/navbar';
import { SidebarWrapper } from '../sidebar/sidebar';

interface Props {
   children: React.ReactNode;
}

export function Layout({children}: Props) {
   const [sidebarOpen, setSidebarOpen] = React.useState(false);
   const [_, setLocked] = useLockedBody(false);
   const handleToggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
      setLocked(!sidebarOpen);
   };

   return (
      <SidebarContext.Provider
         value={{
            collapsed: sidebarOpen,
            setCollapsed: handleToggleSidebar,
         }}
      >
         <WrapperLayout>
            <SidebarWrapper />
            <NavbarWrapper>{children}</NavbarWrapper>
         </WrapperLayout>
      </SidebarContext.Provider>
   );
};