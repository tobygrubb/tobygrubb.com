import styled from 'styled-components/macro'

const View = styled.div`
  left: 0;
  top: 0;
  overflow-x: hidden;
  overflow-y: ${props => (props.activeView === 'root' ? 'hidden' : 'auto')};
  position: fixed;
  max-height: 100%;
  height: 100%;
  transition: transform ${props => (props.filterActive ? '400ms' : '600ms')} cubic-bezier(0, 0, 0.2, 1);
  will-change: transform;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  z-index: ${props => (props.aside ? 'unset' : 20)};
  background-color: 'black';

  transform: translate3d(
    ${({ activeView, viewName, filterActive }) => {
      if (activeView === 'about' && viewName === 'about') return '0'
      if (activeView === 'about' && viewName === 'shop') return '100%'
      if (activeView === 'about' && viewName === 'root') return '100%'

      if (activeView === 'shop' && viewName === 'about') return '-100%'
      if (activeView === 'shop' && viewName === 'shop') return '0'
      if (activeView === 'shop' && viewName === 'root') return '-100%'

      if (activeView === 'root' && viewName === 'about') return filterActive ? '-100%' : '-50%'
      if (activeView === 'root' && viewName === 'shop') return '100%'
      if (activeView === 'root' && viewName === 'root') return '0'
      return null
    }},
    0,
    0
  );

  @media (max-width: 475px) {
    transform: translate3d(
      ${({ activeView, viewName, filterActive }) => {
        if (activeView === 'about' && viewName === 'about') return '0'
        if (activeView === 'about' && viewName === 'shop') return '100%'
        if (activeView === 'about' && viewName === 'root') return '100%'
  
        if (activeView === 'shop' && viewName === 'about') return '-100%'
        if (activeView === 'shop' && viewName === 'shop') return '0'
        if (activeView === 'shop' && viewName === 'root') return '-100%'
  
        if (activeView === 'root' && viewName === 'about') return '-50%'
        if (activeView === 'root' && viewName === 'shop') return '100%'
        if (activeView === 'root' && viewName === 'root') return '0'
        return null
      }},
      0,
      0
    );
  }

  .view__child {
    opacity: ${props => (props.isActive ? 1 : 0)};
    transition: opacity 600ms cubic-bezier(0, 0, 0.2, 1);
    will-change: opacity;
  }
`

export default { View }
