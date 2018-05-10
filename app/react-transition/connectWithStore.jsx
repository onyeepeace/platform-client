import React from "react";
import { connect } from "react-redux";
import angular from "angular";

const connectWithStore = (WrappedComponent, ...args) => {
  const ConnectedWrappedComponent = connect(...args)(WrappedComponent);

  const ConnectedComponentWithStore = props => {
    // Get the injector + store at render time
    // Otherwise it happens before the angular app is set up
    if (!props.store) {
      const injector = angular.element(document).injector();
      /* eslint-disable no-param-reassign */
      props.store = injector.get("$ngRedux");
      /* eslint-enable no-param-reassign */
    }
    return <ConnectedWrappedComponent {...props} />;
  };
  ConnectedComponentWithStore.propTypes = WrappedComponent.propTypes;

  return ConnectedComponentWithStore;
};

export default connectWithStore;
