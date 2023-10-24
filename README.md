
# Getting started

## Setting up a dev environment

To be able to visualise the changes you make to the theme and content there are a few steps that 
you need to take before you start:

- [Create an `.env.local` ](#create-an-env-file)file in the root of your local repository to store the `env variables` that you will need to connect to other aspects of this service.
- [Install the packages](#install-the-packages-and-start-the-service) required to start your local development environment

### Create an env file

- Create a new file in the root of your local project and name it `.env.local`.
- Copy the content below and paste it into the file.
```dotenv
NEXTAUTH_SECRET=frltbb9LZIesEjb3nTsjSO/WBbguJsvzfTa5D8H984Q=
SECRET_PASSWORD=secretpassword
NEXTAUTH_URL=http://localhost:3000
```
> **N.B.** Optional - generate a new secret for the `NEXTAUTH_SECRET` using `openssl`
>```shell
>openssl rand -base64 32
>```

### Install the packages and start the service

From your command line prompt:

- Make sure that you are in the root of your project if not run `cd ~/my_local_project_directory`
- Run `yarn` or `npm install`
- Once the package installation has completed run `yarn dev` or `npm run dev`
- A local instance of the service should now be available in your browser window at http://localhost:3000

### Using a different local port

By default, the showcase site runs on the same port as the prototype kit, so you'll need to change the showcase site port if you want to run both sites locally at the same time.

For example, to change the showcase site to use Port 3001 instead of Port 3000:

1. In `.env.local` change the port `NEXTAUTH_URL=http://localhost:3000` to `NEXTAUTH_URL=http://localhost:3001`
2. In `package.json`, within the 'scripts' object change `"dev": "next dev",` to `"dev": "next dev -p 3001",`
3. Rebuild your local environment
4. A local instance of the service should now be available in your browser window at http://localhost:3001

## Configuring and building your showcase site

1. [Styling](/docs/1_Styling.md)
2. [Creating content](/docs/2_Content.md)
2. [Using components in content](/docs/3_Components.md)
3. [Working with data](/docs/4_Data.md)
4. [Hosting](/docs/5_Hosting.md)
