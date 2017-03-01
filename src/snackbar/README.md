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
 - configurable duration
components
 
 - custom snackbar
 

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
