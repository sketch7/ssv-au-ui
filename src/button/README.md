# Button
Enhance's the native HTML `<button>` or `<a>` tag with styling and animations.

## Usage

```html
<!-- simple -->
<button ssv-button>Usage</button>

<!-- primary binding (color) -->
<button ssv-button="primary">Primary</button>

<!-- additional options -->
<button ssv-button="color: primary; type: outline">Additiona options</button>
```

### Attributes

| Name              | Type              | Default | Required | Description                                                                                                              |
|-------------------|-------------------|---------|----------|--------------------------------------------------------------------------------------------------------------------------|
| color *(primary)* | string            | -       | no       | Color variant. Can be `primary`, `accent`, `danger`, `warn`, `success` or any other custom.                              |
| type              | `ButtonType`      | raised  | no       | Button type style. Can be `flat`, `raised` or `outline`.                                                                 |
| size              | `ElementSizeType` | medium  | no       | Element size. Can be `small`, `medium`, `large` or any other custom.                                                     |
| modifier          | string            | -       | no       | CssClass modifiers which will be generated in BEM style e.g. `awesome super` => `ssv-button--awesome ssv-button--super`. |
| disable-ripple    | boolean           | false   | no       | Whether the ripple effect is disabled.                                                                                   |
| ripple-type       | string            | -       | no       | Ripple type to use (can be styled with css).                                                                             |

## Global Configuration
Options which can be configured globally.

| Name          | Type              | Default |
|---------------|-------------------|---------|
| type          | `ButtonType`      | raised  |
| size          | `ElementSizeType` |         |
| color         | string            |         |
| disableRipple | boolean           | false   |
| rippleType    | string            |         |