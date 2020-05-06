# Okta

Okta is an enterprise-grade authentication management platform that runs on the cloud. Okta is a standards-compliant OAuth 2.0 authorization server that provides API security via scoped access tokens and supports single sign-on functionality. For more info: [Okta Docs](https://support.okta.com/help/s/article/What-is-Okta)

## Table of Contents

- [Getting Started](##getting-started)
- [Using the Dashboard](##using-the-dashboard)
- [Key Environment Variables](##finding-key-environment-variables)
- [Terms](##terms)
- [Helpful Links](##helpful-links)

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

When you connect a branch through amplify to test a PR in staging, you will need to update some of the Okta environmental variables.

- First, within amplify, create a branch override for the `REACT_APP_OKTA_REDIRECT_URI` variable as found [below](###front-end)
- Then, from the Okta Developer Console dashboard, navigate to Applications > [your application] > General > Edit. Add `https://[staging home page].com/implicit/callback` to the `Login redirect URIs` and add `https://[staging home page].com` to the `Logout redirect URIs`.

## Using the Dashboard

### Dashboards

There are two different dashboard views with slightly different tools on each. To switch between the two, you can hover over the selector in the top left side of the screen which says `Developer Console` or `Classic UI` depending on which you are in, then click the other option that appears.

### Applications

This tab manages all of the applications within your organization. Adminstrators can add applications to the organization here, or edit security settings, login redirect paths, sign on rules, and consented API scopes.

### Users

This tab manages all of the users in your organization. The credentials that you use to access this dashboard are the same that you will use to access an account on your application, so these users will contain all of the developers who are working with Okta on the dashboard as well as all of your application's users. If you ever need to manage your users as an administrator, this tab will give you access to reset passwords, activate/deactivate accounts, assign users to applications or groups within your organization, or hard edit information about their profile as stored in Okta.

### Claims

Okta stores certain fields of information about users, such as firstName and lastName. You can create additional fields for okta to track about users called claims through the dashboard.

To create a claim, start in the Developer Console, and go to API > Authorization Servers, and click on the name of an authorization server. Under the Claims tab, there is an `Add Claim` button that can be used to encode a new variable into a token.

For more info about Claims, visit the [Okta Docs](https://developer.okta.com/docs/guides/customize-authz-server/create-claims/).

### Scopes

Scopes specify what access privileges are being requested as part of the authorization. For example, the `email` scope requests access to the user's email address.

To create a scope, start in the Developer Console, and go to API > Authorization Servers, and click on the name of an authorization server. Under the Scopes tab, there is an `Add Scope` button that can be used to create a new scope. Then, go to `src/index.js` and add the scope to the `config` object.

For more info about creating Scopes, visit the [Okta Docs](https://developer.okta.com/docs/guides/customize-authz-server/create-scopes/)

### Enable Self-Service Registration

By default, new applications have self-service registration disabled, meaning that only administrators can create accounts on your applications. To enable self-service registration, navigate to Classic UI > Directory > Self-Service Registration. If you are using the default Okta client as the login form for your application, the tool will now display a message that says `Don't have an account? Sign up` at the bottom of the login tool which links to a registration form.

After self-service registration is enabled, the page that you went to to activate it will contain registration settings. You can return here to change the required fields for creating an account, assign the new user to a group within your application, or toggle the email verification option.

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

## Terms

- **Domain**: This is the url that your project can be found at, and will be formatted as `https://dev-######.okta.com`. Your domain will have a bank of users associated with it, and can contain several applications that share this user bank. Your domain will be used for everything in your Okta organization, and will be useful for making API calls in the authentication process. [Okta Docs](https://developer.okta.com/docs/concepts/okta-organizations/)
- **Application**: You can add applications to the dashboard on your domain, which will manage the security settings of the login experience on an application. You can add multiple applications to the same project domain, which can allow you to have different security configurations between development/staging/production environments and also maintain the same user base for mobile versions of an application.
- **User**: A user is an account that is associated with an Okta domain. This account can be used with any of the applications on the domain. Note that the login you use to get into the developer dashboard will be in the same used to login to your application
- **Authorization Server**: An authorization server, found in the API menu of the Developer Console, defines your security boundary, and is used to mint access and identity tokens when accessing your resources via API. The authorization is central to customizing scopes, claims, and access policies. [Okta Docs](https://developer.okta.com/docs/concepts/auth-servers/)

## Helpful Links

- [Prismatopia docs](https://prismatopia.dev/)
- [Okta SPA integration](https://developer.okta.com/docs/guides/sign-into-spa/angular/before-you-begin/)
- [Okta server-side router web integration](https://developer.okta.com/docs/guides/sign-into-web-app/aspnet/before-you-begin/)
- [Okta iOS integration](https://developer.okta.com/docs/guides/sign-into-mobile-app/ios/before-you-begin/)
