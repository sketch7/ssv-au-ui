# Snackbar
Snackbars provide brief feedback about an operation through a message.

## Usage

### Api

#### SnackbarService

```ts
import { SnackbarService, SnackbarRef } from "@ssv/au-ui";

// inject it (within a class) e.g.
constructor(
    private snackbarService: SnackbarService
)

// open
const snackbarRef = this.snackbarService.open(`Message sent!`);

// open - with action + options
const snackbarRef = this.snackbarService.open("You have been disconnected", "Reconnect", {
    duration: 5000
});

// dismiss - active only
this.snackbarService.dismiss();

// dimissAll - queued and active
this.snackbarService.dismissAll();
```

#### SnackbarRef
Reference returned when opening a snackbar.

```ts
// onDismiss - subscribe on dismiss callback
snackbarRef.onDismiss(() => {
    // ...
});

// onAction - subscribe on action callback
snackbarRef.onAction(() => {
    // ...
});

// dismiss - dismisses the snackbar
snackbarRef.dismiss();
```

## Global Configuration
Options which can be configured globally.

| Name        | Type       | Default           | Description                                                           |
|-------------|------------|-------------------|-----------------------------------------------------------------------|
| duration    | number     | `3000`            | Duration in milliseconds before automatically dismisses the snackbar. |
| actionType  | ButtonType | `buttonType.flat` | Button type for the action. Read button doc for more info.            |
| actionColor | string     | `"accent"`        | Button color for the action. Read button doc for more info.           |


# todo
 - dismiss by gesture - swipe off screen
 - custom snackbar component