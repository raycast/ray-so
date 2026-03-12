import React from "react";

type Props = {} & React.ComponentPropsWithRef<"div">;

const View = (props: Props) => <div {...props} />;

export default View;
