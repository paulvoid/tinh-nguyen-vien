import {Dropdown, Navbar} from '@nextui-org/react';
import React from 'react';
import {NotificationIcon} from '../icons/navbar/notificationicon';

export function NotificationsDropdown(){
   return (
      <Dropdown placement="bottom-right">
         <Dropdown.Trigger>
            <Navbar.Item>
               <NotificationIcon />
            </Navbar.Item>
         </Dropdown.Trigger>
         <Dropdown.Menu
            aria-label="Avatar Actions"
            css={{
               '--nextui--dropdownMenuWidth': '340px',
               '--nextui--dropdownItemHeight': '70px',
               '& .nextui-dropdown-item': {
                  'padding-top': '0.5rem',
                  'padding-bottom': '0.5rem',
                  // dropdown item left icon
                  'svg': {
                     color: '$secondary',
                     'margin-right': '0.5rem',
                  },
                  // dropdown item title
                  '& .nextui-dropdown-item-content': {
                     "width": "100%",
                     'font-weight': '500',
                  },
               },
            }}
         >
            <Dropdown.Section title="Notificacions">
               <Dropdown.Item
                  key="1"
                  showFullDescription
                  description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
               >
                  📣 Edit your information
               </Dropdown.Item>
               <Dropdown.Item
                  key="2"
                  showFullDescription
                  description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
               >
                  🚀 Say goodbye to paper receipts!
               </Dropdown.Item>
               <Dropdown.Item
                  key="3"
                  showFullDescription
                  description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
               >
                  📣 Edit your information
               </Dropdown.Item>
            </Dropdown.Section>
         </Dropdown.Menu>
      </Dropdown>
   );
};
