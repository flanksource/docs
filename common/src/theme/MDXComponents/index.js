import React from 'react'
import MDXHead from '@theme/MDXComponents/Head'
import MDXCode from '@theme/MDXComponents/Code'
import MDXA from '@theme/MDXComponents/A'
import MDXPre from '@theme/MDXComponents/Pre'
import Details from '@theme/Details'
import MDXHeading from '@theme/MDXComponents/Heading'
import MDXUl from '@theme/MDXComponents/Ul'
import MDXImg from '@theme/MDXComponents/Img'
import Admonition from '@theme/Admonition'
import Mermaid from '@theme/Mermaid'
import Icon from '@site/src/components/Icon'
import Menu from '@site/src/components/Menu'
import Tag from '@theme/Tag'
import { Asciinema } from '@site/src/components/Asciinema'
import {
  Health,
  Unhealthy,
  Healthy,
  Warning,
  Commercial,
  Standard,
  Enterprise,
  SkipOSS,
  SkipCommercial
} from '@site/src/components/Badges'
import Action from '@site/src/components/Action'
import HealthCheck from '@site/src/components/HealthCheck'
import Lookup from '@site/src/components/Lookup'
import Screenshot from '@site/src/components/ShadowBox'
import Fields from '@site/src/components/Fields'
import Step from '@site/src/components/Step'
import Highlight from '@site/src/components/Highlight'
import { FullImage } from '@site/src/components/Badges'
import { CommonLink } from '@site/src/components/Link'
import { ConfigTransform } from '@site/src/components/ConfigTransform'
import { CustomField } from '@site/src/components/Badges'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Scraper, CustomScraper } from '@site/src/components/Scraper'
import Helm from "@site/src/components/Helm"
import { Advanced } from '@site/src/components/Badges'
import TerminalOutput from "@site/src/components/TerminalOutput"
import Tooltip from '@site/src/components/Tooltip'
import { Icon as IIcon } from '@iconify-icon/react';
import { Card, Cards } from '@site/src/components/Card'
const MDXComponents = {
  Health: Health,
  Card: Card,
  Cards: Cards,
  TerminalOutput: TerminalOutput,
  Unhealthy: Unhealthy,
  Healthy: Healthy,
  IIcon: IIcon,
  Warning: Warning,
  Advanced: Advanced,
  Tooltip: Tooltip,
  Helm: Helm,
  Menu: Menu,
  Icon: Icon,
  CommonLink: CommonLink,
  ConfigTransform: ConfigTransform,
  CustomField: CustomField,
  Asciinema: Asciinema,
  Commercial: Commercial,
  FullImage: FullImage,
  HealthCheck: HealthCheck,
  Standard: Standard,
  SkipOSS: SkipOSS,
  SkipCommercial: SkipCommercial,
  Enterprise: Enterprise,
  Highlight: Highlight,
  Step: Step,
  head: MDXHead,
  Tag: Tag,
  code: MDXCode,
  a: MDXA,
  Tabs: Tabs,
  Scraper: Scraper,
  CustomScraper: CustomScraper,
  TabItem: TabItem,
  pre: MDXPre,
  details: Details,
  Screenshot: Screenshot,
  Lookup: Lookup,
  Details: Details,
  Action: Action,
  Fields: Fields,
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
