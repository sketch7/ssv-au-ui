# Snackbar
*todo*

## Usage

*todo*

### Attributes

*todo*

## Global Configuration
Options which can be configured globally.

*todo*


# todo
components
 - snackbar-host
 - snackbar-container
 - simple-snackbar
 - snackbar-service

 - simple snackbar - message/action
 - custom snackbar
 - show only one at a time

```ts
const snackbarRef = snackbar.open("Message sent");
snackbarRef.onDismiss()
    .then(() => /* do something */);
snackbarRef.onAction()
    .then(() => /*do something*/);
snackbarRef.dismiss();

// custom (advanced)
const customRef = snackbar.openComponent(MyCustomComponent);
```

```html
<ssv-snackbar-host></ssv-snackbar-host>
```
