import Rheostat from 'rheostat';
import styled from 'styled-components';

const StyledRheostat = styled(Rheostat)`
  height: 24px;
  margin: 0 12px;
  position: relative;
  overflow: visible;

  .rheostat-background {
    background: ${({ theme }) => theme.vars.color.grey2};
    height: 2px;
    position: relative;
    top: 14px;
    width: 100%;
  }

  .rheostat--disabled .rheostat-progress {
    background-color: #edefed;
  }

  .rheostat--disabled .rheostat-handle {
    cursor: default;
  }

  .rheostat-progress {
    background-color: ${({ theme }) => theme.vars.color.grey4};
    height: 4px;
    position: absolute;
    top: 13px;
  }

  .rheostat-handle {
    border: 1px solid ${({ theme }) => theme.vars.color.grey3};
    background: #fff;
    border-radius: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    height: 25px;
    margin-left: -12px;
    position: absolute;
    z-index: 1;
    width: 24px;
    font-size: 0;
  }
`;

export default StyledRheostat;
