# React/Rails Project Setup Guide

## Learning Goals

- Set up a project with a Rails API backend and React frontend from scratch

## Introduction

In this lesson, we'll walk through the steps needed to set up a project with a
Rails API backend and React frontend from scratch. We'll also discuss the
environment setup you'll need as well as a few of the important application
settings to configure. Ultimately, you'll end up with an application similar to
the starter code for this [Rails/React project template][project template].

Fair warning: going through this setup for the first time may take some time!
The benefit is that you'll have a deeper understanding of how Rails and React
are configured, and will be able to more easily customize your setup for future
projects by understanding some of the design decisions that go into creating a
full stack application.

The `example-project` directory in this repo was created by following the steps
in this guide, so you can also use that as a reference to see the finished
product.

## Table of Contents

- [Environment Setup](#environment-setup)
  - [Requirements](#requirements)
  - [Install the Latest Ruby Version](#install-the-latest-ruby-version)
  - [Install NodeJS](#install-nodejs)
  - [Install Postgresql](#install-postgresql)
  - [Set Up a Render Account](#set-up-a-render-account)
  - [Environment Troubleshooting](#environment-troubleshooting)
- [Project Setup](#project-setup)
  - [Rails Setup](#rails-setup)
  - [React Setup](#react-setup)
- [GitHub](#github)
- [Deploying](#deploying)
  - [Preparing your App for Deployment](#preparing-your-app-for-deployment)
  - [Creating the App Database](#creating-the-app-database)
  - [Creating the Render Web Service](#creating-the-render-web-service)
- [Configuring React and Rails for Client-Side Routing](#configuring-react-and-rails-for-client-side-routing)
- [Conclusion](#conclusion)
- [Resources](#resources)

---

## Environment Setup

Before starting, make sure your computer has all the necessary tools to build
the application and that these tools match up with what you'll use in a
production environment. This will ensure that when it comes time to deploy your
project, you'll be able to do so more easily.

### Requirements

- Ruby 2.7.4
- NodeJS (v16), and npm
- Postgresql
- Render account

### Install the Latest Ruby Version

Verify which version of Ruby you're running by entering this in the terminal:

```console
$ ruby -v
```

We recommend version 2.7.4. If you need to upgrade you can install it using rvm:

```console
$ rvm install 2.7.4 --default
```

You should also install the latest versions of `bundler` and `rails`:

```console
$ gem install bundler
$ gem install rails
```

### Install NodeJS

Verify you are running a recent version of Node with:

```console
$ node -v
```

If your Node version is not 16.x.x, install it and set it as the current and
default version with:

```console
$ nvm install 16
$ nvm use 16
$ nvm alias default 16
```

You can also update your npm version with:

```console
$ npm i -g npm
```

### Install Postgresql

Render requires that you use PostgreSQL for your database instead of SQLite.
PostgreSQL (or just Postgres for short) is an advanced database management
system with more features than SQLite. If you don't already have it installed,
you'll need to set it up.

#### PostgreSQL Installation for WSL

To install Postgres for WSL, run the following commands from your Ubuntu
terminal:

```console
$ sudo apt update
$ sudo apt install postgresql postgresql-contrib libpq-dev
```

Then confirm that Postgres was installed successfully:

```console
$ psql --version
```

Run this command to start the Postgres service:

```console
$ sudo service postgresql start
```

Finally, you'll also need to create a database user so that you are able to
connect to the database from Rails. First, check what your operating system
username is:

```console
$ whoami
```

If your username is "ian", for example, you'd need to create a Postgres user
with that same name. To do so, run this command to open the Postgres CLI:

```console
$ sudo -u postgres -i
```

From the Postgres CLI, run this command (replacing "ian" with your username):

```console
$ createuser -sr ian
```

Then enter `control + d` or type `logout` to exit.

[This guide][postgresql wsl] has more info on setting up Postgres on WSL if you
get stuck.

[postgresql wsl]:
  https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-postgresql

#### Postgresql Installation for OSX

To install Postgres for OSX, you can use Homebrew:

```console
$ brew install postgresql
```

Once Postgres has been installed, run this command to start the Postgres
service:

```console
$ brew services start postgresql
```

### Set Up a Render Account

You can sign up for a free account at
[https://dashboard.render.com/register][Render signup]. We recommend that you
sign up using GitHub as that will make it a little easier for you to connect
Render to your GitHub account.

[Render signup]: https://dashboard.render.com/register

Once you've completed the signup process, you will be taken to the Render
dashboard. In order to connect Render to your GitHub account, you'll need to
click the "New Web Service" button in the "Web Services" box. On the next page,
you will see a GitHub heading on the right side and below that a link that's
labeled either "Connect account" or "Configure account". Click that link, then
in the modal that appears click "Install." You should then be taken back to the
"Create a New Web Service" page, which should now show a list of your GitHub
repos. We won't actually create a web service just yet so you are free to
navigate away from the page at this point.

Next, we'll set up a PostgreSQL instance. Click the "New +" button at the top of
the page and select "PostgreSQL". Enter a name for your PostgreSQL instance. The
remaining fields can be left as is. Click "Create Database" at the bottom of the
page.

### Environment Troubleshooting

If you ran into any errors along the way, here are some things you can try to
troubleshoot:

- If you're on a Mac and got a server connection error when you tried to run
  `rails db:create`, one option for solving this problem for Mac users is to
  install the Postgres app. To do this, first uninstall `postgresql` by running
  `brew remove postgresql`. Next, download the app from the [Postgres downloads
  page][postgres downloads page] and install it. Launch the app and click
  "Initialize" to create a new server. You should now be able to run
  `rails db:create`.

- If you're using WSL and got the following error running `rails db:create`:

  ```txt
  PG::ConnectionBad: FATAL:  role "yourusername" does not exist
  ```

  The issue is that you did not create a role in Postgres for the default user
  account. Check [this video](https://www.youtube.com/watch?v=bQC5izDzOgE) for
  one possible fix.

- If your app failed to deploy at the build stage, make sure your local
  environment is set up correctly by following the steps at the beginning of
  this lesson. Check that you have the latest versions of Ruby and Bundler, and
  ensure that Postgresql was installed successfully.

- If you deployed successfully, but you ran into issues when you visited the
  site, make sure you migrated and seeded the database. Also, make sure that
  your application works locally and try to debug any issues on your local
  machine before re-deploying. You can also check the deployment log on the
  app's page in the Render dashboard.

[postgres downloads page]: https://postgresapp.com/downloads.html

---

## Project Setup

Now that your environment setup is done, we can get on to the fun part: creating
your project's starter code! In this section, we'll walk through the steps
needed to generate a new Rails application from scratch, set up some of the
configuration, add a React application, and connect your project repository with
GitHub.

### Rails Setup

> **Notes**: If you ran `gem install rails` to install the latest version of
> Rails on your system, it's likely that you'll be using [Rails 7][rails 7]. The
> labs in Phase 4 use Rails 6, and there are some small differences between the
> two versions.  This guide should work for Rails 7 as well, but some things may
> look a little different than what is shown below. If you'd like to use Rails 6
> instead, you can follow [this guide][rails version guide] to use a specific
> version of Rails when generating your new project.

[rails 7]: https://rubyonrails.org/2021/12/15/Rails-7-fulfilling-a-vision
[rails version guide]:
  https://www.aloucaslabs.com/miniposts/using-a-specific-rails-version-when-you-generate-a-new-rails-app-with-rails-new-command

To start, `cd` into a directory where you'd like to create your project. Then
run this command to generate a project folder with all the starter code for a
new Rails API:

```console
$ rails new example-project -T -d=postgresql --api
```

- `-T` skips creation of test files
- `-d=postgresql` configures PostgreSQL as the database instead of SQLite
- `--api` configures the app with a limited set of middleware, and skips
  views/helpers/assets on resource generation.

This command will also initialize Git in your project folder.

#### Check Your Work: Rails Setup

At this point, you should verify that the application is set up correctly and in
particular that you are able to use PostgreSQL as the database. `cd` into the
project folder and run this command to create a database for your application:

```console
$ rails db:create

Created database 'example_project_development'
Created database 'example_project_test'
```

If you run into any errors here, check out the Troubleshooting section of the
Environment Setup and make sure you are able to run `rails db:create` before
proceeding.

#### Configuring Gems

We recommend adding the [ActiveModelSerializers][ams] gem to your project:

```console
$ bundle add active_model_serializers
```

[ams]: https://github.com/rails-api/active_model_serializers

To enable password encryption, un-comment the `bcrypt` gem from your Gemfile,
and run `bundle install` to install it.

Your final Gemfile should look something like this:

```rb
source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.4'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
gem 'rails', '~> 6.1.4', '>= 6.1.4.1'
# Use postgresql as the database for Active Record
gem 'pg', '~> 1.1'
# Use Puma as the app server
gem 'puma', '~> 5.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.4', require: false

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
end

group :development do
  gem 'listen', '~> 3.3'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

gem 'active_model_serializers', '~> 0.10.12'
```

Finally, in order to configure your project to run in a production environment
with Render, you'll need to update the `Gemfile.lock` file with this command:

```console
$ bundle lock --add-platform x86_64-linux
```

#### Cookies & Sessions

Next, we'll configure Rails with middleware for cookies and sessions, which will
enable you to use sessions for authenticating users. To add session and cookie
support back in, update your application's configuration in the
`config/application.rb` file:

```rb
# config/application.rb
module ExampleProject
  class Application < Rails::Application
    config.load_defaults 6.1

    # This is set in apps generated with the --api flag, and removes session/cookie middleware
    config.api_only = true

    # ▾ Must add these lines! ▾
    # Adding back cookies and session middleware
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore

    # Use SameSite=Strict for all cookies to help protect against CSRF
    config.action_dispatch.cookies_same_site_protection = :strict
  end
end
```

This will add in the necessary [middleware][] for working with sessions and
cookies in your application.

The last line also adds some additional security to your cookies by configuring
the `SameSite` policy for your cookies as `strict`, which means that the browser
will only send these cookies in requests to websites that are on the same
domain. This is a relatively new feature, but an important one for security! You
can read more about [`SameSite` cookies here][same site cookies].

[middleware]:
  https://guides.rubyonrails.org/rails_on_rack.html#action-dispatcher-middleware-stack
[same site cookies]: https://web.dev/samesite-cookies-explained/

To access the `cookies` hash in your controllers, you also need to include the
`ActionController::Cookies` module in your `ApplicationController`:

```rb
# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  include ActionController::Cookies
end
```

Since all of your controllers inherit from `ApplicationController`, adding this
module here means all of your controllers will be able to work with cookies.

#### Check Your Work: Cookies & Sessions

As a last step of the Rails setup, let's verify that the cookies and sessions
middleware is working as expected. To do this, make a new controller action in
the `ApplicationController` that uses the `session` hash and returns a JSON
response:

```rb
# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  include ActionController::Cookies

  def hello_world
    session[:count] = (session[:count] || 0) + 1
    render json: { count: session[:count] }
  end
end
```

Also, create a route that uses this controller action:

```rb
# config/routes.rb
Rails.application.routes.draw do
  # route to test your configuration
  get '/hello', to: 'application#hello_world'
end
```

Finally, run your application:

```console
$ rails s
```

Head to the browser and open up
[http://localhost:3000/hello](http://localhost:3000/hello). You should see a
JSON response with an initial value of `{ count: 1}`. If your sessions and
cookies are configured correctly, you should be able to refresh the page and see
the count increment by 1 each time. If not, review the steps above before
proceeding.

Commit your changes before moving ahead:

```console
$ git add .
$ git commit -m 'Rails setup'
```

### React Setup

For the frontend portion of the application, you'll be using `create-react-app`
to generate a new React application **in the same directory** as your Rails
application. In your terminal, verify that you're in the right directory by
running `pwd` and checking that you are in the root of your Rails application.
Then, run:

```console
$ npx create-react-app client --use-npm
```

**NOTE:** If you get an error that says "We no longer support global
installation of Create React App" try the following command instead:

```console
npx create-react-app@latest client --use-npm
```

This will create a new React application in a `client` folder, and will use npm
instead of yarn to manage your dependencies.

When running React and Rails in development, you'll need two separate servers
running on different ports: React on port 4000, and Rails on port 3000. Whenever
you want to make a request to your Rails API from React, you'll need to make
sure that requests are going to port 3000.

You can simplify this process of making requests to the correct port by using
`create-react-app` in development to [proxy the requests to our API][proxy].
This will let you write your network requests like this:

```js
fetch("/hello");
// instead of fetch("http://localhost:3000/hello")
```

To set up this proxy feature, open the `package.json` file in the `client`
directory and add this line at the top level of the JSON object:

```json
"proxy": "http://localhost:3000"
```

Also update the "start" script in the the `client/package.json` file to specify
a different port to run our React app in development:

```json
"scripts": {
  "start": "PORT=4000 react-scripts start"
}
```

Your final `client/package.json` file should look something like this:

```json
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:3000",
  "dependencies": {
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "web-vitals": "^1.1.2"
  },
  "scripts": {
    "start": "PORT=4000 react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

#### Check Your Work: React Setup

Now that you've configured React, it's a good time to check that your settings
are correct and that you're able to make a request from React and receive a
response from Rails. First, update the starter code in the `client/src/App.js`
file to make a request to the route you set up previously in Rails:

```jsx
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <div className="App">
      <h1>Page Count: {count}</h1>
    </div>
  );
}

export default App;
```

Next, run the Rails server in one terminal:

```console
$ rails s
```

Open another terminal and run the React server:

```console
$ npm start --prefix client
```

Head to the browser and view your React application at
[http://localhost:4000/](http://localhost:4000/). You should be able to refresh
the page and see the count state increment on each refresh because of the code
in the `ApplicationController#hello_world` method from earlier.

Commit your changes before moving ahead:

```console
$ git add .
$ git commit -m 'React setup'
```

## GitHub

First, [create a new remote repository][create repo] on GitHub. Head to
[github.com](https://github.com) and click the **+** icon in the top-right
corner and follow the steps to create a new repository. **Important**: don't
check any of the options such as 'Add a README file', 'Add a .gitignore file',
etc. — since you're importing an existing repository, creating any of those files
on GitHub will cause issues.

[create repo]:
  https://docs.github.com/en/github/importing-your-projects-to-github/importing-source-code-to-github/adding-an-existing-project-to-github-using-the-command-line#adding-a-project-to-github-without-github-cli

If you're working with a partner, [add them as a collaborator][add collaborator]
on GitHub. From your repo on GitHub, go to Settings > Manage Access > Invite a
collaborator and enter your partner's username. Once your partner has access,
they should git **clone** (not fork) the repository.

[add collaborator]:
  https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-user-account/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository

Finally, connect the GitHub remote repository to your local repository and push
up your code:

```console
$ git remote add origin git@github.com:your-username/your-repo-name.git
$ git push -u origin main
```

## Deploying

It's recommended that you deploy your project early, and push up changes often,
to ensure that your code works equally well in production and development
environments.

### Preparing your App for Deployment

Before we can deploy our app to Render, we need to make a few modifications.

First, open the `config/database.yml` file, scroll down to the `production`
section, and update the code to the following:

```yml
production:
  <<: *default
  url: <%= ENV['DATABASE_URL'] %>
```

Next, open `config/puma.rb` and find the section shown below. Here, you will
un-comment out two lines of code and make one small edit:

```rb
# Specifies the number of `workers` to boot in clustered mode.
# Workers are forked web server processes. If using threads and workers together
# the concurrency of the application would be max `threads` * `workers`.
# Workers do not work on JRuby or Windows (both of which do not support
# processes).
#
workers ENV.fetch("WEB_CONCURRENCY") { 4 } ### CHANGE: Un-comment out this line; update the value to 4

# Use the `preload_app!` method when specifying a `workers` number.
# This directive tells Puma to first boot the application and load code
# before forking the application. This takes advantage of Copy On Write
# process behavior so workers use less memory.
#
preload_app! ### CHANGE: Un-comment out this line
```

Next, open the `config/environments/production.rb` file and find the following
line:

```rb
config.public_file_server.enabled = ENV["RAILS_SERVE_STATIC_FILES"].present?
```

Update it to the following:

```rb
config.public_file_server.enabled = ENV['RAILS_SERVE_STATIC_FILES'].present? || ENV['RENDER'].present?
```

Finally, inside the `bin` folder create a `render-build.sh` script and copy the
following into it:

```sh
#!/usr/bin/env bash
# exit on error
set -o errexit

# Build commands for front end to create the production build
rm -rf public
npm install --prefix client && npm run build --prefix client
cp -a client/build/. public/

# Build commands for back end
bundle install
bundle exec rake db:migrate 
bundle exec rake db:seed # if you have seed data, run this command for the initial deploy only to avoid duplicate records
```

Then run the following command in the terminal to update the permissions on the
script and make sure it's executable:

```console
chmod a+x bin/render-build.sh
```

Commit your changes and push them up to GitHub:

```
$ git add .
$ git commit -m 'Configure for Render'
$ git push
```

### Creating the App Database

Render allows users to create [multiple databases within a single PostgreSQL
instance][multiple dbs] using the PostgreSQL interactive terminal,
[`psql`][psql].

Navigate to your PostgreSQL instance from the Render dashboard, click the
"Connect" dropdown, then the External Connection tab, and copy the PSQL command.
Paste it into your terminal and press enter. This command connects you to the
remote PostgreSQL instance.

To create the database, run this SQL command:

```sql
CREATE DATABASE new_db_name;
```

Now if you run `\l` from the PSQL prompt, you should see a table that includes
your main PostgreSQL instance as well as the database you just created.

Run `\q` to exit PSQL.

[multiple dbs]: https://render.com/docs/databases#multiple-databases-in-a-single-postgresql-instance
[psql]: https://www.postgresql.org/docs/current/app-psql.html

### Creating the Render Web Service

To deploy, click the "New +" button in Render and select "Web Service". You'll
see a list of all the repositories in your GitHub account. Find the repo for the
example project and click the "Select" button.

In the page that opens, enter a name for your app and make sure the Environment
is set to Ruby.

Scroll down and set the Build Command to `./bin/render-build.sh` and the Start
Command to `bundle exec puma -C config/puma.rb`.

Open a separate tab in your browser, navigate to the Render dashboard, and click
on your PostgreSQL instance. Scroll down to the "Connection" section, find the
"Internal Database URL", and copy it.

Return to the other tab. Scroll down and click the "Advanced" button, then click
"Add Environment Variable." Enter `DATABASE_URL` as the key, then paste in the
URL you just copied as the value. Note that the URL will end with the name you
gave your PostgreSQL instance when you initially created it; be sure to remove
that name and replace it with the name of the database you created in the last
section.

Click "Add Environment Variable" again. Add `RAILS_MASTER_KEY` as the key. The
value is in the `config/master.key` file in your app's files. Copy the value and
paste it in.

The completed page should look something like this:

![Web service settings](https://curriculum-content.s3.amazonaws.com/phase-4/project-template/web-service-settings.png)

Scroll down to the bottom of the page and click "Create Web Service". The deploy
process will begin automatically.

### Check Your Work: Deploying

Once the deploy process has completed, click on your app's URL in the upper left
corner. Once the page has loaded (which may take a few moments), you should see
your deployed app in the browser. If you get a "Page not found" error, wait a
few minutes and refresh the page.

## Configuring React and Rails for Client-Side Routing

In many React applications, it's helpful to use React Router to handle
client-side routing. Client-side routing means that a user should be able to
navigate to the React application, load all the HTML/CSS/JavaScript code just
**once**, and then click through links in our site to navigate different pages
without making another request to the server for a new HTML document.

To install React Router, run:

```console
$ npm install react-router-dom@5 --prefix client
```

> **Note**: make sure to include `@5` in the install command to install React
> Router version 5 (which is what we cover in the curriculum), instead of
> version 6.

Next, update the `App` component to use a couple routes for testing purposes:

```jsx
// client/src/components/App.js
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/testing">
            <h1>Test Route</h1>
          </Route>
          <Route path="/">
            <h1>Page Count: {count}</h1>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

When you run the app locally using `npm start` and webpack is handling the React
server, it can handle these client-side routing requests just fine! Try it out:
run React in one terminal and Rails in another:

```console
$ rails s
$ npm start --prefix client
```

Make a request to `http://localhost:4000` and `http://localhost:4000/testing`.
Both routes work just fine because we're running a separate server for React.

**However**, when we're running React within the Rails application after
deploying, we also have routes defined for our Rails API, and Rails will be
responsible for all the routing logic in our application. There will be only one
server running: the Rails server; all the React code will run client-side in the
browser.

So let's think about what will happen from the point of view of **Rails** when a
user makes a request to these routes:

- `GET /`: Rails will respond with the `public/index.html` file. This is what we
  want to happen for **all** client-side routes.
- `GET /testing`: Rails will look for a `GET /testing` route in the
  `config/routes.rb` file. If we don't have this route defined, it will return a
  404 error.

Any other client-side routes we define in React will have the same issue as
`/testing`: since Rails is handling the routing logic, it will look for routes
defined in the `config/routes.rb` file to determine how to handle all requests.

We can solve this problem by setting up a **custom route** in our Rails
application, and handle any requests that come through that **aren't** requests
for our API routes by returning the `public/index.html` file instead.

Here's how it works:

```rb
# config/routes.rb
Rails.application.routes.draw do
  get '/hello', to: 'application#hello_world'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
```

All the routes for our API are defined **first** in the `routes.rb` file. You
can optionally use [namespacing][] to differentiate the API requests from other
requests.

[namespacing]:
  https://guides.rubyonrails.org/routing.html#controller-namespaces-and-routing

The last method in the `routes.rb` file handles all other `GET` requests by
sending them to a special `FallbackController` with an `index` action:

```rb
# app/controllers/fallback_controller.rb
class FallbackController < ActionController::Base
  def index
    render file: 'public/index.html'
  end
end
```

This action has just one job: to render the HTML file for our React application!
Note that the `FallbackController` must inherit from `ActionController::Base` in
order to render HTML.

### Check Your Work: Client-Side Routing

Test your client-side routes in the deployed application by first committing and
pushing your code to GitHub:

```console
$ git add .
$ git commit -m 'Configured client-side routing'
$ git push
```

Then redeploy the app by going to the example project's page in the Render
dashboard, clicking the "Manual Deploy" button, and selecting "Deploy latest
commit".

Once the new version has finished deploying, test your client-side routes in the
deployed app.

---

## Conclusion

Congrats on setting up your Rails/React project! 🎉

In this guide, you:

- Created a new Rails API application
- Configured cookies and sessions
- Added a React frontend
- Set up a GitHub repository
- Configured your application for deployment
- Tested your application locally and in production

From here on out, as you continue adding features, make sure to push your
changes up to GitHub, deploy to Render, and check that your features work in the
production environment as you go.

You should also make sure to update your project's README file with details
about your project.

We'll let you take it from here. Good luck!

---

## Resources

- [Rails/React project template][project template]
- [Proxying API Requests in Create React App][proxy]
- [Getting Started with Ruby on Rails on Render][getting started with rails]
- [Render Databases Guide][databases guide]

[project template]:
  https://github.com/learn-co-curriculum/project-template-react-rails-api
[proxy]: https://create-react-app.dev/docs/proxying-api-requests-in-development/
[getting started with rails]: https://render.com/docs/deploy-rails
[databases guide]: https://render.com/docs/databases
