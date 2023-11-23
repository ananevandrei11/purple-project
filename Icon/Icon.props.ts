import { DetailedHTMLProps, SVGAttributes } from 'react';

export interface IconProps
  extends DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> {
  titleAccess?: string;
  htmlColor?: string;
}

export interface IconSpecificProps
  extends DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> {
  className?: string;
  titleAccess?: string;
}
