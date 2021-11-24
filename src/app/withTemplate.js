import * as React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

const withTemplate = (Template, WrappedComponent, isLandingPage) => {
  const AddedTemplate = (props) => {
    return (
      <Template {...props} isLandingPage={isLandingPage}>
        <WrappedComponent {...props} />
      </Template>
    );
  };

  return hoistNonReactStatics(AddedTemplate, WrappedComponent);
};

export default withTemplate;
