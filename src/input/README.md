# Input
Inputs are the basic input component.

## Usage

```html
<!-- simple -->
<ssv-input label="First name"
    value.bind="firstName">
</ssv-input>

<!-- basic options -->
<ssv-input label="Password"
    value.bind="password"
    type="password"
    help="enter your super secret key!">
</ssv-input>

<!-- additional options -->
<ssv-input label="First name"
    placeholder="e.g. John"
    value.bind="firstName"
    disabled.bind="isDisabled"
    color="primary"
    type="text"
    help="press submit to read value (see console)">
</ssv-input>
```

### Attributes

| Name        | Type        | Default | Required | Description                                                                                                              |
|-------------|-------------|---------|----------|--------------------------------------------------------------------------------------------------------------------------|
| label       | `string`    |         | no       | Label text to display.                                                                                                   |
| value       | `string`    |         | yes      | Value of the input to be bound.                                                                                          |
| placeholder | `string`    |         | no       | Placeholder text to show when input is empty.                                                                            |
| color       | `string`    | -       | no       | Color variant. Can be `primary`, `accent`, `danger`, `warn`, `success` or any other custom.                              |
| type        | `InputType` | `text`  | no       | Html input type. Can be `text`, `password`, `number` or `email`.                                                         |
| disabled    | `boolean`   | `false` | no       | Determines whether input is disabled or not.                                                                             |
| help        | `string`    |         | no       | Help label which can be used as a hint.                                                                                  |
| modifier    | `string`    | -       | no       | CssClass modifiers which will be generated in BEM style e.g. `awesome super` => `ssv-button--awesome ssv-button--super`. |

## Global Configuration
Options which can be configured globally.

| Name  | Type        | Default | Description                     |
|-------|-------------|---------|---------------------------------|
| color | `string`    | -       | Refer to attribute description. |