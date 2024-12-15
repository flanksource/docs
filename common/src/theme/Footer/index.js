import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import Footer from '@site/src/components/Footer';
function footer() {
  const { footer } = useThemeConfig();
  if (!footer) {
    return null;
  }
  return <Footer />
}
export default React.memo(footer);
