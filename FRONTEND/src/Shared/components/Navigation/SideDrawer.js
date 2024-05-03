import React from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

export const SideDrawer = props => {
 return createPortal( 
         <CSSTransition in={props.show} timeout={200} classNames="slide-in-left" mountOnEnter unmountOnExit> 
            <aside onClick={props.onClick} className="side-drawer">
                {props.children}
            </aside>
         </CSSTransition>,
         document.getElementById('drawer-hook')
      )
  
 
};
