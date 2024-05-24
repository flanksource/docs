---
title: Security
---

At Flanksource, security isn't just a feature; it's the foundation of the design that went into the Mission Control platform. We've meticulously designed every aspect of our internal developer platform to meet the stringent requirements of security teams.

## Secure SDLC

Flanksource follows a secure SDLC

1. Code scanning using Github [CodeQL](https://codeql.github.com/)
2. Merge blocking unit and integration tests using Github Actions
3. Branch protection to prevent history rewrite
4. Automatic dependency scanning and updates with Github [Dependabot](https://github.com/features/security/software-supply-chain)
5. Project CI/CD compliance scanning using [OpenSSF Scorecards](https://securityscorecards.dev/)
6. Automated build and publishing of artifacts
7. CI Supply Chain Runtime Scanner using  [Step Harden Runner](https://github.com/step-security/harden-runner)

## Secret Management

All flanksource projects are built with secure secret management in mind, where possible secrets are automatically generated at install time and saved to Kubernetes Secrets, Pre-existing secrets are read from environment variables/files supplied by end users using Kubernetes Secrets or Helm Values

Role based IAM identity is possible and preferred for Kubernetes, AWS, GKE and Azure.

## Source Open

All the code for Mission Control self-hosted is publicly available and free to use for non-prod purposes, Enabling any security researcher to review the source code and perform white-box testing.

 The security scan results for all projects are available in the links below.

## Security Dashboard

| Project              | Description                                      | License                                             | Scorecard                                                    | CII Best Practices                                  |
| -------------------- | ------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Mission Control      | Primary microservice and orchestrator | <img alt="Static Badge" src="https://img.shields.io/badge/Free%20for%20Non%20Prod-8A2BE2?link=https%3A%2F%2Fraw.githubusercontent.com%2Fflanksource%2Fmission-control%2Fmain%2FLICENSE"/> | [![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/flanksource/mission-control/badge)](https://securityscorecards.dev/viewer/?uri=github.com/flanksource/mission-control) |  |
| Canary Checker       | Health checks and topology scanning | <img alt="GitHub License" src="https://img.shields.io/github/license/flanksource/canary-checker?label=%22%22"/> | [![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/flanksource/canary-checker/badge)](https://securityscorecards.dev/viewer/?uri=github.com/flanksource/canary-checker) | <img alt="CII Best Practices" src="https://img.shields.io/cii/level/8335?label=%22%22"/> |
| Config DB            | Catalog Scraper | <img alt="Static Badge" src="https://img.shields.io/badge/Free%20for%20Non%20Prod-8A2BE2?link=https%3A%2F%2Fraw.githubusercontent.com%2Fflanksource%2Fmission-control%2Fmain%2FLICENSE"/> | [![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/flanksource/config-db/badge)](https://securityscorecards.dev/viewer/?uri=github.com/flanksource/config-db) |  |
| Duty                 | Data Access Library | <img alt="GitHub License" src="https://img.shields.io/github/license/flanksource/duty?label=%22%22"/> | [![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/flanksource/duty/badge)](https://securityscorecards.dev/viewer/?uri=github.com/flanksource/duty) |  |
| Is-Healthy           | Library for get health status of Kubernetes objects | <img alt="GitHub License" src="https://img.shields.io/github/license/flanksource/is-healthy?label=%22%22"/> | [![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/flanksource/is-healthy/badge)](https://securityscorecards.dev/viewer/?uri=github.com/flanksource/is-healthy) |  |
| Gomplate | Go and CEL templating library | <img alt="GitHub License" src="https://img.shields.io/github/license/flanksource/gomplate?label=%22%22"/> | ![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/flanksource/gomplate/badge) |  |
| Flanksource UI       | Dashboard | <img alt="Static Badge" src="https://img.shields.io/badge/Free%20for%20Non%20Prod-8A2BE2?link=https%3A%2F%2Fraw.githubusercontent.com%2Fflanksource%2Fmission-control%2Fmain%2FLICENSE"/> | [![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/flanksource/flanksource-ui/badge)](https://securityscorecards.dev/viewer/?uri=github.com/flanksource/flanksource-ui) |  |
| **External Dependencies** |  |  |  |  |
| PostgREST | REST API for Database | <img alt="GitHub License" src="https://img.shields.io/github/license/postgrest/postgrest?label=%22%22"/> | [![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/PostgREST/postgrest/badge)](https://securityscorecards.dev/viewer/?uri=github.com/PostgREST/postgrest) |  |
| Kratos (Self-Hosted) | 3rd Party Application for Authentication | <img alt="GitHub License" src="https://img.shields.io/github/license/ory/kratos?label=%22%22"/> | [![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/ory/kratos/badge)](https://securityscorecards.dev/viewer/?uri=github.com/ory/kratos) |  |
| Clerk (SaaS) | 3rd Party Service for Authentication |  | [Docs](https://clerk.com/docs/security/overview) |  |

## Reporting a Vulnerability

If you discover any security vulnerabilities within this project, please report them to our team immediately. We appreciate your help in making this project more secure for everyone.

To report a vulnerability, please follow these steps:

1. **Email**: Send an email to our security team at [security@flanksource.com](mailto:security@flanksource.com) with a detailed description of the vulnerability.
2. **Subject Line**: Use the subject line "Security Vulnerability Report" to ensure prompt attention.
3. **Information**: Provide as much information as possible about the vulnerability, including steps to reproduce it and any supporting documentation or code snippets.
4. **Confidentiality**: We prioritize the confidentiality of vulnerability reports. Please avoid publicly disclosing the issue until we have had an opportunity to address it.

Our team will respond to your report as soon as possible and work towards a solution. We appreciate your responsible disclosure and cooperation in maintaining the security of this project.

Thank you for your contribution to the security of this project!

**Note:** This project follows responsible disclosure practices.
