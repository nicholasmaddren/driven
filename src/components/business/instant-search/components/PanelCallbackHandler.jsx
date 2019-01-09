import { Component } from 'react';
import PropTypes from 'prop-types';

class PanelCallbackHandler extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    canRefine: PropTypes.bool.isRequired,
  };

  static contextTypes = {
    setCanRefine: PropTypes.func,
  };

  componentDidMount() {
    if (this.context.setCanRefine) {
      this.context.setCanRefine(this.props.canRefine);
    }
  }

  componentDidUpdate(nextProps) {
    if (
      this.context.setCanRefine &&
      this.props.canRefine !== nextProps.canRefine
    ) {
      this.context.setCanRefine(nextProps.canRefine);
    }
  }

  render() {
    return this.props.children;
  }
}

export default PanelCallbackHandler;
