# Button
Enhances the native HTML `<button>` or `<a>` tag with styling and animations.

## Usage

```html
<!-- simple -->
<button ssv-button>Usage</button>

<!-- primary binding (color) + used on 'a' tag -->
<a ssv-button="primary">Primary</a>

<!-- additional options -->
<button ssv-button="color: primary; type: outline">Additional options</button>
```

### Attributes

| Name              | Type              | Default | Required | Description                                                                                                              |
|-------------------|-------------------|---------|----------|--------------------------------------------------------------------------------------------------------------------------|
| color *(primary)* | `string`          | -       | no       | Color variant. Can be `primary`, `accent`, `danger`, `warn`, `success` or any other custom.                              |
| type              | `ButtonType`      | `raised`| no       | Button type style. Can be `flat`, `raised` or `outline`.                                                                 |
| size              | `ElementSizeType` | `medium`| no       | Element size. Can be `small`, `medium`, `large` or any other custom.                                                     |
| disable-ripple    | `boolean`         | `false` | no       | Whether the ripple effect is disabled.                                                                                   |
| ripple-type       | `string`          | -       | no       | Ripple type to use (can be styled with css).                                                                             |

## Global Configuration
Options which can be configured globally.

| Name          | Type              | Default  | Description                     |
|---------------|-------------------|----------|---------------------------------|
| color         | `string`          | -        | Refer to attribute description. |
| type          | `ButtonType`      | `raised` | Refer to attribute description. |
| size          | `ElementSizeType` | -        | Refer to attribute description. |
| disableRipple | `boolean`         | `false`  | Refer to attribute description. |
| rippleType    | `string`          | -        | Refer to attribute description. |