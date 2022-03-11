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
  - [Sign Up for a Heroku Account](#sign-up-for-a-heroku-account)
  - [Download the Heroku CLI Application](#download-the-heroku-cli-application)
  - [Install Postgresql](#install-postgresql)
  - [Environment Troubleshooting](#environment-troubleshooting)
- [Project Setup](#project-setup)
  - [Rails Setup](#rails-setup)
  - [React Setup](#react-setup)
  - [Deploying](#deploying)
  - [GitHub](#github)
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
- Heroku CLI
- Postgresql

### Install the Latest Ruby Version

Verify which version of Ruby you're running by entering this in the terminal:

```console
$ ruby -v
```

Make sure that the Ruby version you're running is listed in the [supported
runtimes][] by Heroku. At the time of writing, supported versions are 2.6.8,
2.7.4, or 3.0.2. Our recommendation is 2.7.4, but make sure to check the site
for the latest supported versions.

If it's not, you can use `rvm` to install a newer version of Ruby:

```console
$ rvm install 2.7.4 --default
```

You should also install the latest versions of `bundler` and `rails`:

```console
$ gem install bundler
$ gem install rails
```

[supported runtimes]:
  https://devcenter.heroku.com/articles/ruby-support#supported-runtimes

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

### Sign Up for a Heroku Account

You can sign up at for a free account at
[https://signup.heroku.com/devcenter][heroku signup].

### Download the Heroku CLI Application

Download the [Heroku CLI][heroku cli]. For OSX users, you can use Homebrew:

```console
$ brew tap heroku/brew && brew install heroku
```

For WSL users, run this command in the Ubuntu terminal:

```console
$ curl https://cli-assets.heroku.com/install.sh | sh
```

If you run into issues installing, check out the [Heroku CLI][heroku cli]
downloads page for more options.

After downloading, you can login via the CLI in the terminal:

```console
$ heroku login
```

This will open a browser window to log you into your Heroku account. After
logging in, close the browser window and return to the terminal. You can run
`heroku whoami` in the terminal to verify that you have logged in successfully.

[heroku signup]: https://signup.heroku.com/devcenter
[heroku cli]:
  https://devcenter.heroku.com/articles/heroku-cli#download-and-install

### Install Postgresql

Heroku requires that you use PostgreSQL for your database instead of SQLite.
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
  machine before re-deploying. You can also check the logs on the server by
  running `heroku logs`.

For additional support, check out these guides on Heroku:

- [Deploying a Rails 6 App to Heroku][heroku rails deploying guide]
- [Rails Troubleshooting on Heroku][troubleshooting guide on heroku]

[postgres downloads page]: https://postgresapp.com/downloads.html
[heroku rails deploying guide]:
  https://devcenter.heroku.com/articles/getting-started-with-rails6
[troubleshooting guide on heroku]:
  https://devcenter.heroku.com/articles/getting-started-with-rails6#troubleshooting

---

## Project Setup

Now that your environment setup is done, we can get on to the fun part: creating
your project's starter code! In this section, we'll walk through the steps
needed to generate a new Rails application from scratch; set up some of the
configuration; add a React application; and connect your project repository with
GitHub.

### Rails Setup

> **Notes**: If you ran `gem install rails` to install the latest version of
> Rails on your system, it's likely that you'll be using [Rails 7][rails 7]. The
> labs in Phase 4 use Rails 6, and there are some small differences between the
> two versions. We'll point out these differences in the guide below. If you'd
> like to use Rails 6 instead, you can follow [this guide][rails version guide]
> to use a specific version of Rails when generating your new project.

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

> **Note for Rails 7**: There is currently an [open issue][ams issue] with the
> `active_model_serializers` gem that means it won't work with Rails 7. If you
> run into an issue when installing `active_model_serializers`, try updating
> your Gemfile to use the following source:
>
> ```rb
> gem 'active_model_serializers',
>     '~> 0.10.12',
>     git: 'https://github.com/jpawlyn/active_model_serializers.git',
>     branch: '0-10-stable'
> ```

[ams issue]: https://github.com/rails-api/active_model_serializers/pull/2428

Finally, in order to configure your project to run in a production environment
with Heroku, you'll need to update the `Gemfile.lock` file with this command:

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

The last line also adds some additional security to your cookies by also
configuring the as `SameSite` policy for your cookies as `strict`, which means
that the browser will only send these cookies in requests to websites that are
on the same domain. This is a relatively new feature, but an important one for
security! You can read more about [`SameSite` cookies here][same site cookies].

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

**NOTE:**
If you get an error that says "We no longer support global installation of Create React App" try the following command instead:

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

### Deploying

It's recommended that you deploy your project early, and push up changes often,
to ensure that your code works equally well in production and development
environments.

If you've already set up your environment to deploy to Heroku, you can run the
commands below to deploy your application. If not, make sure to check out the
Environment Setup section above and ensure you have the Heroku CLI installed.

First, you'll need to add a configuration file for React that will tell Heroku
how to build our application when it's deployed. Remember, `create-react-app` is
ultimately used to create a **single-page application**, with just one HTML file
that will serve all of our React code. We can use Rails to serve that HTML file
by adding it to a `public` directory in the Rails application, so our goal after
deploying is to have a `public` folder with all of our production-ready React
code.

To achieve this, in the **root** directory of your project (not the `client`
directory), create a `package.json` file with the following:

```json
{
  "name": "example-project",
  "description": "Build scripts for Heroku",
  "engines": {
    "node": ">= 14"
  },
  "scripts": {
    "build": "npm install --prefix client && npm run build --prefix client",
    "clean": "rm -rf public",
    "deploy": "cp -a client/build/. public/",
    "heroku-postbuild": "npm run clean && npm run build && npm run deploy"
  }
}
```

When you push up new code to Heroku, it will detect if there is a `package.json`
file in the root of your application, and will run the `heroku-postbuild` script
defined in the `package.json` file. This script does the following:

- `clean`: First, it deletes all files in the `public` directory (to remove any
  old versions of your React application)
- `build`: Next, it installs all the project dependencies in the `client` folder
  with `npm install` and builds a production version of your React application
  using webpack, which creates a bundled and minified version of your codebase
  for optimal performance, which is output to a `client/build` folder
- `deploy`: Finally, it copies the the files from the `client/build` folder to
  the `public` folder, which will be served by Rails whenever a request comes in
  to a non-API route in the application

You can see what this command does locally by running it from your terminal:

```console
$ npm run heroku-postbuild
```

The final output will end up in the `public` folder in the root of your project.

After adding this `package.json` file, you should also create a
[`Procfile`][procfile] in the root of your application, where you can also
define more custom scripts that will run when your application is deployed:

```txt
web: bundle exec rails s
release: bin/rake db:migrate
```

This Procfile instructs Heroku to run our Rails server with `rails s`, and also
to run any pending migrations when new code is pushed up.

Finally, it's time to deploy! To deploy, first log in to your Heroku account
using the Heroku CLI:

```console
$ heroku login
```

Create the new Heroku app:

```console
$ heroku create example-project
```

> Note: the name you choose for your project must be unique as it will show up
> as part of the URL (`https://example-project.herokuapp.com`).

Add the buildpacks for Heroku to build the React app on Node and run the Rails
app on Ruby:

```console
$ heroku buildpacks:add heroku/nodejs --index 1
$ heroku buildpacks:add heroku/ruby --index 2
```

To deploy, commit any pending changes to your code, and push to Heroku:

```console
$ git add .
$ git commit -m 'Added configuration files'
$ git push heroku main
```

> Note: depending on your Git configuration, your default branch might be named
> `master` or `main`. You can verify which by running
> `git branch --show-current`. If it's `master`, you'll need to run
> `git push heroku master` instead.

When you push the code to Heroku, it will run a few commands to build the
application in order based on the "buildpacks" we configured:

- `heroku/nodejs`: will run the `heroku-postbuild` script defined in the
  `package.json` file to build the React application
- `heroku/rails`: will install all the Rails dependencies from the `Gemfile`

Watch the output in the terminal to see what's happening. If any error messages
appear, read them carefully to diagnose the issue and make the recommended
changes, then commit and push your code again to retry the deployment.

Any time you have changes to deploy, just make sure your changes are committed
on the main branch of your repo, and push those changes to Heroku to deploy
them.

#### Check Your Work: Deploying

You can view your deployed app in the browser with:

```console
$ heroku open
```

You should see your React application in the browser. Try refreshing the page to
see if the sessions logic and requests to the Rails API are working as they did
when running the application locally.

You can also see details about your app from the
[Heroku dashboard](https://dashboard.heroku.com/), and by running commands from
the Heroku CLI. For example, you can view the server logs:

```console
$ heroku logs --tail
```

Press `control + c` to exit the logs. You can also run a Rails console and other
Rails commands on the production server with `heroku run`:

```console
$ heroku run rails c
```

#### Configuring React and Rails for Client-Side Routing

In many React applications, it's helpful to use React Router to handle
client-side routing. Client-side routing means that a user should be able to
navigate to the React application; load all the HTML/CSS/JavaScript code just
**once**; and then click through links in our site to navigate different pages
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
deploying, we also have routes defined for our Rails API; and Rails will be
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

#### Check Your Work: Client-Side Routing

You can test out if the new code for handling client-side routing is working
locally by building a production version of your React application and running
the Rails server. To do this, you can use the same `heroku-postbuild` script
locally as Heroku will run in production to build the React project:

```console
$ npm run heroku-postbuild
```

Then, run the Rails server:

```console
$ rails s
```

Now, visiting [http://localhost:3000](http://localhost:3000) (**not 4000**) will
show the production version of the React application, served from the
`public/index.html` file!

You should also be able to visit other client-side routes, like
[http://localhost:3000/testing](http://localhost:3000/testing), to verify that
the fallback route configuration is working.

Finally, commit and push your code to Heroku:

```console
$ git add .
$ git commit -m 'Configured client-side routing'
$ git push heroku main
```

Test your client-side routes in the deployed application once the new version is
built and released:

- `https://example-project.herokuapp.com`
- `https://example-project.herokuapp.com/testing`

### GitHub

First, [create a new remote repository][create repo] on GitHub. Head to
[github.com](https://github.com) and click the **+** icon in the top-right
corner and follow the steps to create a new repository. **Important**: don't
check any of the options such as 'Add a README file', 'Add a .gitignore file',
etc — since you're importing an existing repository, creating any of those files
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

You can also [configure automatic deployments to Heroku][auto deploy] so that
any time you push a new commit to your main branch on GitHub, it will trigger a
new deployment on Heroku! Otherwise, you can continue using
`git push heroku main` to deploy new releases.

[auto deploy]: https://devcenter.heroku.com/articles/github-integration

---

## Conclusion

Congrats on setting up your Rails/React project! 🎉

In this guide, you:

- Created a new Rails API application
- Configured cookies and sessions
- Added a React frontend
- Configured your application for deployment
- Tested your application locally and in production
- Set up a GitHub repository

From here on out, as you continue adding features, make sure to push your
changes up to GitHub and to Heroku regularly, and check that your features work
in the production environment as you go.

You should also make sure to update your project's README file with details
about your project.

We'll let you take it from here. Good luck!

---

## Resources

- [Rails/React project template][project template]
- [Proxying API Requests in Create React App][proxy]
- [Heroku Node Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Heroku Rails Support](https://devcenter.heroku.com/articles/getting-started-with-rails6)
- [Heroku Procfile][procfile]

[project template]:
  https://github.com/learn-co-curriculum/project-template-react-rails-api
[proxy]: https://create-react-app.dev/docs/proxying-api-requests-in-development/
[procfile]: https://devcenter.heroku.com/articles/procfile
