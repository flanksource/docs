import React from 'react';
import Layout from '@theme/Layout';
import Navigation from '@site/src/components/flanksource/Navigation';

export default function PrivacyPage() {
  return (
    <Layout
      noHeader
      title="Privacy Policy"
      description="Flanksource Privacy Policy - How we collect, use, and protect your data"
    >
      <Navigation />
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <article className="markdown">
              <h1>Privacy Policy</h1>
              <p><strong>Effective Date:</strong> August 16, 2021</p>

              <p>
                At Flanksource, we take your privacy seriously. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h2>Information We Collect</h2>

              <h3>Personal Data</h3>
              <p>
                We may collect personally identifiable information, such as your name, email address, and
                company information when you voluntarily provide it to us.
              </p>

              <h3>Usage Data</h3>
              <p>
                We may also collect information that your browser sends whenever you visit our Service
                ("Usage Data"). This Usage Data may include information such as your computer's Internet
                Protocol address (e.g., IP address), browser type, browser version, the pages of our Service
                that you visit, the time and date of your visit, the time spent on those pages, unique device
                identifiers, and other diagnostic data.
              </p>

              <h3>Cookies and Tracking Technologies</h3>
              <p>
                We use cookies and similar tracking technologies to track the activity on our Service and
                hold certain information. You can instruct your browser to refuse all cookies or to indicate
                when a cookie is being sent.
              </p>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect in the following ways:</p>
              <ul>
                <li>To provide, operate, and maintain our services</li>
                <li>To improve, personalize, and expand our services</li>
                <li>To understand and analyze how you use our services</li>
                <li>To develop new products, services, features, and functionality</li>
                <li>To communicate with you, either directly or through one of our partners</li>
                <li>To send you updates and marketing communications</li>
                <li>To process your transactions</li>
                <li>To find and prevent fraud</li>
              </ul>

              <h2>GDPR Compliance</h2>
              <p>
                If you are a resident of the European Economic Area (EEA), you have certain data protection
                rights. Flanksource aims to take reasonable steps to allow you to correct, amend, delete, or
                limit the use of your Personal Data.
              </p>

              <h3>Your Rights Under GDPR</h3>
              <ul>
                <li><strong>Right to Access:</strong> You have the right to request copies of your personal data</li>
                <li><strong>Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate</li>
                <li><strong>Right to Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions</li>
                <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions</li>
                <li><strong>Right to Object to Processing:</strong> You have the right to object to our processing of your personal data, under certain conditions</li>
                <li><strong>Right to Data Portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions</li>
              </ul>

              <h2>Data Retention</h2>
              <p>
                We will retain your Personal Data only for as long as is necessary for the purposes set out
                in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to
                comply with our legal obligations, resolve disputes, and enforce our policies.
              </p>

              <h2>Data Security</h2>
              <p>
                The security of your data is important to us, but remember that no method of transmission over
                the Internet or method of electronic storage is 100% secure. While we strive to use commercially
                acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>

              <h2>Third-Party Services</h2>
              <p>
                We may employ third-party companies and individuals to facilitate our Service ("Service Providers"),
                to provide the Service on our behalf, to perform Service-related services, or to assist us in
                analyzing how our Service is used.
              </p>

              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting
                the new Privacy Policy on this page and updating the "Effective Date" at the top.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:privacy@flanksource.com">privacy@flanksource.com</a>
              </p>
            </article>
          </div>
        </div>
      </div>
    </Layout>
  );
}
