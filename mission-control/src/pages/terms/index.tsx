import React from 'react';
import Layout from '@theme/Layout';
import Navigation from '@site/src/components/flanksource/Navigation';

export default function TermsPage() {
  return (
    <Layout
      noHeader
      title="Terms and Conditions"
      description="Flanksource Terms and Conditions - Terms of service for using our platform"
    >
      <Navigation />
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <article className="markdown">
              <h1>Terms and Conditions</h1>
              <p><strong>Last Updated:</strong> August 16, 2021</p>

              <p>
                Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before
                using the Flanksource services (the "Service") operated by Flanksource ("us", "we", or "our").
              </p>

              <h2>Acceptance of Terms</h2>
              <p>
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with
                any part of the terms, then you may not access the Service.
              </p>

              <h2>Accounts</h2>
              <p>
                When you create an account with us, you must provide information that is accurate, complete,
                and current at all times. Failure to do so constitutes a breach of the Terms, which may result
                in immediate termination of your account on our Service.
              </p>

              <p>
                You are responsible for safeguarding the password that you use to access the Service and for
                any activities or actions under your password, whether your password is with our Service or a
                third-party service.
              </p>

              <p>
                You agree not to disclose your password to any third party. You must notify us immediately upon
                becoming aware of any breach of security or unauthorized use of your account.
              </p>

              <h2>Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the
                exclusive property of Flanksource and its licensors. The Service is protected by copyright,
                trademark, and other laws of both the United States and foreign countries.
              </p>

              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without
                the prior written consent of Flanksource.
              </p>

              <h2>User Content</h2>
              <p>
                Our Service may allow you to post, link, store, share and otherwise make available certain
                information, text, graphics, or other material ("Content"). You are responsible for the Content
                that you post on or through the Service.
              </p>

              <p>
                By posting Content on or through the Service, you grant us the right and license to use, modify,
                publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.
              </p>

              <h2>Prohibited Uses</h2>
              <p>You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:</p>
              <ul>
                <li>In any way that violates any applicable national or international law or regulation</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                <li>To impersonate or attempt to impersonate Flanksource, a Flanksource employee, another user, or any other person or entity</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
                <li>To introduce any viruses, trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful</li>
              </ul>

              <h2>Payment and Subscription</h2>
              <p>
                Certain aspects of the Service may be provided for a fee or other charges. If you elect to use
                paid aspects of the Service, you agree to the pricing and payment terms as outlined at the time
                of purchase.
              </p>

              <p>
                Flanksource reserves the right to change its prices at any time. We will provide you with reasonable
                notice of any such pricing changes by posting the new prices on or through the Service.
              </p>

              <h2>Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any
                reason whatsoever, including without limitation if you breach the Terms.
              </p>

              <p>
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate
                your account, you may simply discontinue using the Service.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                In no event shall Flanksource, nor its directors, employees, partners, agents, suppliers, or
                affiliates, be liable for any indirect, incidental, special, consequential or punitive damages,
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                resulting from:
              </p>
              <ul>
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use or alteration of your transmissions or content</li>
              </ul>

              <h2>Disclaimer</h2>
              <p>
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE"
                basis. The Service is provided without warranties of any kind, whether express or implied, including,
                but not limited to, implied warranties of merchantability, fitness for a particular purpose,
                non-infringement or course of performance.
              </p>

              <h2>Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the State of Delaware,
                United States, without regard to its conflict of law provisions.
              </p>

              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of
                those rights. If any provision of these Terms is held to be invalid or unenforceable by a court,
                the remaining provisions of these Terms will remain in effect.
              </p>

              <h2>Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                revision is material, we will try to provide at least 30 days' notice prior to any new terms taking
                effect.
              </p>

              <p>
                By continuing to access or use our Service after those revisions become effective, you agree to be
                bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:{' '}
                <a href="mailto:legal@flanksource.com">legal@flanksource.com</a>
              </p>
            </article>
          </div>
        </div>
      </div>
    </Layout>
  );
}
