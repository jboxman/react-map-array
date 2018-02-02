import React from 'react';
import propTypes from 'prop-types';

export default class MapArray extends React.Component {
  static propTypes = {
    from: propTypes.array.isRequired,
    children: propTypes.element.isRequired,
    map: propTypes.func
  }

  static defaultProps = {
    map: e => e
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.from !== this.props.from;
  }

  render() {
    const {
      from,
      children,
      map
    } = this.props;

    const child = React.Children.only(children);
    const mapped = from.map((item, key) => (
      React.cloneElement(child, {
        key,
        ...map(item, key)
      })
    ));
    return mapped;
  }
}
