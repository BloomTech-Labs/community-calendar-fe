# Okta

Okta is an enterprise-grade authentication management platform that runs on the cloud. Okta is a standards-compliant OAuth 2.0 authorization server that provides API security via scoped access tokens and supports single sign-on functionality. For more info: [Okta Docs](https://support.okta.com/help/s/article/What-is-Okta)

## Vocabulary **_MOVE THIS SECTION TO FAQ_**

- **Domain**: This is the url that your project can be found at, and will be formatted as `https://dev-######.okta.com`. Your domain will have a bank of users associated with it, and can contain several applications that share this user bank.
- **Application**: You can add applications to the dashboard on your domain, which will manage the security settings of the login experience on an application. You can add multiple applications to the same project domain, which can allow you to have different security configurations between development/staging/production environments and also maintain the same user base for mobile versions of an application.
- **User**: A user is an account that is associated with an Okta domain. This account can be used with any of the applications on the domain. Note that the login you use to get into the developer dashboard will be in the same used to login to your application
- **API**: **_ADD CONTENT HERE_**

## Getting Started

### New Projects

To integrate Okta into a front end that is not currently using Okta, the easiest way is to create a `login` link that redirects to Okta's client. The guide for this can be found in the [Okta Docs](https://developer.okta.com/docs/guides/sign-into-spa/react/before-you-begin/)

### Add a Team Member as an Admin

The Okta Dashboard is only available to administrators, so it is important that everyone who is going to be using Okta to develop is added as an admin to the project. To ad a new admin, first add the user through the dashboard by going to Users > People > Add Person. Make sure to select the box labeled `Send user activation email now`. If you forget to do this, you can resend an activation email by selecting the name of a user with the status `Pending user action` and clicking the `Resend Verification Email` button on their page.

Once the user has been added, navigate to the `Classic UI` dashboard, then go to Security > Administrators > Add Administrator. Only a Super Administrator is able to manage applications, authorization servers, hooks, Okta Mobile, and other admins, so this level is pretty important for an involved developer. Okta reccommends having as few Super Administrators as possible, so determine with your team the appropriate distribution of admin privileges for your app's security.

### Preparing Your Development Environment

The front end uses 3 environment variables related to Okta. The locations of these variables can be found [below](###front-end).

The back end also uses 3 environment variables related to Okta found [below](###back-end)

### Preparing Okta for a Staging Branch

**_FIND STAGING BRANCH DOCS_**

## Using the Dashboard

### Dashboards

There are two different dashboard views with slightly different tools on each. To switch between the two, you can hover over the selector in the top left side of the screen which says `Developer Console` or `Classic UI` depending on which you are in, then click the other option that appears.

### Claims

Okta stores certain fields of information about users, such as firstName and lastName. You can create additional fields for okta to track about users called claims through the dashboard.

To create a claim, start in the Developer Console, and go to API > Authorization Servers, and click on the name of an authorization server. Under the Claims tab, there is an Add Claim button that can be used to encode a new variable into a token.

For more info about Claims, visit the [Okta Docs](https://developer.okta.com/docs/guides/customize-authz-server/create-claims/).

### Scopes

**_ADD QUICK GUIDE ON SCOPES_**

### Applications

**_ADD QUICK GUIDE ON APPLICATIONS_**

## Finding key environment variables

### Front End

- **REACT_APP_CLIENTID**: Applications > [Application Name] > General > Client ID
- **REACT_APP_OKTA_ISSUER**: `https://dev-######.okta.com/oauth2/default`\*
- **REACT_APP_OKTA_REDIRECT_URI**:
  - Development: `http://localhost:3000/implicit/callback`
  - Staging: `https://[staging home page]/implicit/callback`
  - Production: `https://www.ourcommunitycal.com/implicit/callback`

### Back End

- **APOLLO_TOKEN_ENDPOINT**: `https://dev-######.okta.com/oauth2/default/v1/token`\*
- **APOLLO_JWKS_URI**: `https://dev-######.okta.com/oauth2/default/v1/keys`\*
- **APOLLO_JWT_ISSUER**: `https://dev-######.okta.com/oauth2/default`\*

\* (`######` found at Dashboard > Org URL near the top)

## Helpful Links **_MOVE SECTION DOWN TO FAQ MAYBE_**

- [Prismatopia docs](https://prismatopia.dev/)
- [Okta SPA integration](https://developer.okta.com/docs/guides/sign-into-spa/angular/before-you-begin/)
- [Okta server-side router web integration](https://developer.okta.com/docs/guides/sign-into-web-app/aspnet/before-you-begin/)
- [Okta iOS integration](https://developer.okta.com/docs/guides/sign-into-mobile-app/ios/before-you-begin/)

## FAQ
