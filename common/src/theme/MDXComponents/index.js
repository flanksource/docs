import React from 'react'
import MDXHead from '@theme/MDXComponents/Head'
import MDXCode from '@theme/MDXComponents/Code'
import MDXA from '@theme/MDXComponents/A'
import MDXPre from '@theme/MDXComponents/Pre'
import MDXDetails from '@theme/MDXComponents/Details'
import MDXHeading from '@theme/MDXComponents/Heading'
import MDXUl from '@theme/MDXComponents/Ul'
import MDXImg from '@theme/MDXComponents/Img'
import Admonition from '@theme/Admonition'
import Mermaid from '@theme/Mermaid'
import Icon from '@site/src/components/Icon'
import { Asciinema } from '@site/src/components/Asciinema'
import {
  Commercial,
  Standard,
  Enterprise,
  SkipOSS,
  SkipCommercial
} from '@site/src/components/Badges'
import Step from '@site/src/components/Step'
import Highlight from '@site/src/components/Highlight'
import { FullImage } from '@site/src/components/Badges'
import { CommonLink } from '@site/src/components/Link'
import { ConfigTransform } from '@site/src/components/ConfigTransform'
import { CustomField } from '../../components/Badges'

const MDXComponents = {
  Icon: Icon,
  CommonLink: CommonLink,
  ConfigTransform: ConfigTransform,
  CustomField: CustomField,
  Asciinema: Asciinema,
  Commercial: Commercial,
  FullImage: FullImage,
  Standard: Standard,
  SkipOSS: SkipOSS,
  SkipCommercial: SkipCommercial,
  Enterprise: Enterprise,
  Highlight: Highlight,
  Step: Step,
  head: MDXHead,
  code: MDXCode,
  a: MDXA,
  pre: MDXPre,
  details: MDXDetails,
  ul: MDXUl,
  img: MDXImg,
  h1: (props) => <MDXHeading as="h1" {...props} />,
  h2: (props) => <MDXHeading as="h2" {...props} />,
  h3: (props) => <MDXHeading as="h3" {...props} />,
  h4: (props) => <MDXHeading as="h4" {...props} />,
  h5: (props) => <MDXHeading as="h5" {...props} />,
  h6: (props) => <MDXHeading as="h6" {...props} />,
  admonition: Admonition,
  mermaid: Mermaid
}
export default MDXComponents
