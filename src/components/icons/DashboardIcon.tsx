import Image from "next/image";

import { type SVGProps } from "react";
import { IconSize } from "./enum";

const DashboardIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Image
      src="/dashboard-icon.svg"
      alt="Dashboard Icon"
      {...props}
      width={IconSize.xlarge}
      height={IconSize.xlarge}
    />
  );
};

export default DashboardIcon;
