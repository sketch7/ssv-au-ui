# Badge
A Badge, with optional background colors.

## Usage

```html
<!-- simple -->
<ssv-badge>hello</ssv-badge>

<!-- color -->
<ssv-badge color="info">23</ssv-badge>

<!-- additional options -->
<ssv-badge color="danger" type="rounded">3</ssv-badge>
```

### Attributes

| Name              | Type              | Default | Required | Description                                                                                                              |
|-------------------|-------------------|---------|----------|--------------------------------------------------------------------------------------------------------------------------|
| type              | `BadgeType`       | `label` | no       | Button type style. Can be `label` or `rounded`.                                                                          |
| color             | `string`          | -       | no       | Color variant. Can be `primary`, `accent`, `danger`, `warn`, `success`, `info` or any other custom.                      |
| modifier          | `string`          | -       | no       | CssClass modifiers which will be generated in BEM style e.g. `awesome super` => `ssv-badge--awesome ssv-badge--super`.   |

## Global Configuration
Options which can be configured globally.

| Name  | Type        | Default | Description                     |
|-------|-------------|---------|---------------------------------|
| type  | `BadgeType` | `label` | Refer to attribute description. |
| color | `string`    | -       | Refer to attribute description. |
