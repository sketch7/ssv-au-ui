# Waves
Enhances the elements `<div>`, `<button>`, `img`, etc... to do waves on click.

## Usage

```html
<!-- simple -->
<div ssv-waves>Element with waves</div>

<!-- primary binding (type) -->
<div ssv-waves="waves-light">Element with waves</div>
```

### Attributes

| Name             | Type     | Default | Required | Description                                  |
|------------------|----------|---------|----------|----------------------------------------------|
| type *(primary)* | `string` | -       | no       | Ripple type to use (can be styled with css). |

## Global Configuration
Options which can be configured globally.

| Name     | Type     | Default | Description                           |
|----------|----------|---------|---------------------------------------|
| type     | `string` | -       | Refer to attribute description.       |
| duration | `number` | -       | Animation duration in milliseconds.   |
| delay    | `string` | -       | Delay animation in milliseconds.      |