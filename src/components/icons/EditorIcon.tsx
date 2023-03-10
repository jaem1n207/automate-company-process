import Image from "next/image";

import { type SVGProps } from "react";
import { IconSize } from "./enum";

const EditorIcon = (props: SVGProps<SVGSVGElement>) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <Image
    src="/editor-icon.svg"
    alt="Editor Icon"
    {...props}
    width={IconSize.xlarge}
    height={IconSize.xlarge}
  />
);

export default EditorIcon;
