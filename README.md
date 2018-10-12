#  News

## This application use News API(https://newsapi.org/) and it is free to register, please register and get a api url and api key

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `yarn` or `npm i`


## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`

## Screen shoots

### homeScreen

![homeScreen](https://github.com/arthurzoubin/news/raw/master/screenshoots/list-ios.png)

![homeScreen](https://github.com/arthurzoubin/news/raw/master/screenshoots/list-android.png)


### actionSheet

![actionSheet](https://github.com/arthurzoubin/news/raw/master/screenshoots/actionsheet-ios.png)

![actionSheet](https://github.com/arthurzoubin/news/raw/master/screenshoots/actionsheet-android.png)

### unit test

![unit-test](https://github.com/arthurzoubin/news/raw/master/screenshoots/testcases.png)

![unit-test](https://github.com/arthurzoubin/news/raw/master/screenshoots/coverage.png)


**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
API_KEY=123456789abc
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

### Get started:
1. Copy .env.example to .env
2. Add your config variables
3. Follow instructions at [https://github.com/luggit/react-native-config#setup](https://github.com/luggit/react-native-config#setup)
4. Done!
