# Checkbox
Provides native `<input type="checkbox" />` functionality with enhanced styling and animations.

## Usage

```html
<!-- simple -->
<ssv-checkbox label="Locked"
    checked.bind="isLocked">
</ssv-checkbox>

<!-- basic options -->
<ssv-checkbox color="primary"
    type="filled"
    label="Locked"
    checked.bind="isLocked">
</ssv-checkbox>

<!-- additional options -->
<ssv-checkbox color="primary"
    type="filled"
    label="Locked"
    label-position="before"
    indeterminate
    disabled
    checked.bind="isLocked">
</ssv-checkbox>
```

### Attributes

| Name           | Type                | Default   | Required | Description                                                                                                              |
|----------------|---------------------|-----------|----------|--------------------------------------------------------------------------------------------------------------------------|
| checked        | `boolean`           | `false`   | no       | Value of the checkbox whether its is checked or not.                                                                     |
| disabled       | `boolean`           | `false`   | no       | Determines whether the checkbox is disabled or not.                                                                      |
| color          | `string`            | -         | no       | Color variant. Can be `primary`, `accent`, `danger`, `warn`, `success` or any other custom.                              |
| type           | `CheckboxType`      | `minimal` | no       | Button type style. Can be `minimal` or `filled`.                                                                         |
| label          | `string`            | -         | no       | Label text to display.                                                                                                   |
| label-position | `LabelPositionType` | `after`   | no       | Whether the label should appear after or before the checkbox. Can be `after` or `before`.                                |
| indeterminate  | `boolean`           | `false`   | no       | Whether the checkbox is indeterminate. Indeterminate will have 3 states, unset, checked and unchecked.                   |
| modifier       | `string `           | -         | no       | CssClass modifiers which will be generated in BEM style e.g. `awesome super` => `ssv-button--awesome ssv-button--super`. |

## Global Configuration
Options which can be configured globally.

| Name          | Type                | Default   | Description                     |
|---------------|---------------------|-----------|---------------------------------|
| color         | `string`            | -         | Refer to attribute description. |
| type          | `CheckboxType`      | `minimal` | Refer to attribute description. |
| labelPosition | `LabelPositionType` | `after`   | Refer to attribute description. |