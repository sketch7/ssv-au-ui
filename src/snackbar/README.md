# Snackbar
Snackbars provide brief feedback about an operation through a message.

## Usage

During bootstrapping within `main` initialize `SnackbarHostService`.

```ts
import { SnackbarHostService } from "@ssv/au-ui";

aurelia.start().then(() => {
    const snackbarHost = aurelia.container.get(SnackbarHostService) as SnackbarHostService;
    snackbarHost.init();
});
```

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

| Name        | Type         | Default |
|-------------|--------------|---------|
| duration    | number       | 3000    |
| actionType  | `ButtonType` | flat    |
| actionColor | string       | accent  |


# todo
 - dismiss by gesture - swipe off screen
 - custom snackbar component