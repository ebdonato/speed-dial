# Links da Babi (speed-dial)

Links da Babi is Speed Dial for Browser New Tabs or for Network Social Profile/Bio Links

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

## Firebase Rules

### Realtime Database

```json
{
  "rules": {
    "bookmarks": {
       ".indexOn": ["index"],
       "$uid": {
        ".read": true,
        ".write": "auth.uid == $uid"
      }
    },
    "config": {
       "$uid": {
        ".read": true,
        ".write": "auth.uid == $uid"
      }
    }
  }
}
```

### Storage
```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
