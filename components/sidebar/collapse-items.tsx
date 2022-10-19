import {Collapse, Text} from '@nextui-org/react';
import React, {useState} from 'react';
import {ChevronUpIcon} from '../icons/sidebar/chevron-up-icon';
import {Flex} from '../styles/flex';

interface Props {
   icon: React.ReactNode;
   title: string;
   items: string[];
}

export function CollapseItems({icon, items, title}: Props) {
   const [open, setOpen] = useState(false);

   const handleToggle = () => setOpen(!open);
   return (
      <Flex
         css={{
            gap: '0.5rem',
            height: '100%',
            alignItems: 'center',
            cursor: 'pointer',
         }}
         align={'center'}
      >
         <Collapse
            title={
               <Flex
                  css={{
                     'gap': '0.5rem',
                     'width': '100%',
                     'padding-top': '0.625rem',
                     'padding-bottom': '0.625rem',
                     'padding-left': '0.875rem',
                     'padding-right': '0.875rem',
                     'borderRadius': '8px',
                     'transition': 'all 0.15s ease',
                     '&:active': {
                        transform: 'scale(0.98)',
                     },
                     '&:hover': {
                        'background': 'var(--nextui-colors-accents2)',
                     },
                  }}
                  justify={'between'}
                  onClick={handleToggle}
               >
                  <Flex css={{gap: '0.75rem'}}>
                     {icon}
                     <Text
                        span
                        weight={'normal'}
                        size={'$base'}
                        css={{
                           color: 'var(--nextui-colors-accents9)',
                        }}
                     >
                        {title}
                     </Text>
                  </Flex>

                  <ChevronUpIcon
                     css={{
                        transition: 'transform 0.3s ease',
                        transform: open ? 'rotate(-180deg)' : 'rotate(0deg)',
                     }}
                  />
               </Flex>
            }
            css={{
               'width': '100%',
               '& .nextui-collapse-view': {
                  padding: '0',
               },
               '& .nextui-collapse-content': {
                  marginTop: '$1',
                  padding: '0px',
               },
            }}
            divider={false}
            showArrow={false}
         >
            {items.map((item, index) => (
               <Flex
                  key={index}
                  direction={'column'}
                  css={{
                     paddingLeft: '3rem',
                  }}
               >
                  <Text
                     span
                     weight={'normal'}
                     size={'$md'}
                     css={{
                        'color': '$accents8',
                        'cursor': 'pointer',
                        '&:hover': {
                           color: '#11181C',
                        },
                     }}
                  >
                     {item}
                  </Text>
               </Flex>
            ))}
         </Collapse>
      </Flex>
   );
};
