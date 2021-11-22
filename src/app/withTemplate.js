import * as React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

const withTemplate = (Template, WrappedComponent, footerImg, footer) => {
  const AddedTemplate = (props) => {
    return (
      <Template {...props} footerImg={footerImg} footer={footer}>
        <WrappedComponent {...props} />
      </Template>
    );
  };

  return hoistNonReactStatics(AddedTemplate, WrappedComponent);
};

export default withTemplate;
