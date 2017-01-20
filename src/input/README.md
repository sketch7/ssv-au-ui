# Input
Inputs are the basic input component.

## Usage

```html
<ssv-input label="First name"
    placeholder="e.g. John"
    value.bind="firstName"
    disabled.bind="isDisabled"
    type="text"
    help="press submit to read value (see console)"
    modifier="success another">
</ssv-input>
```

### Attributes
| Name          | Type        | Default | Description                      |
|---------------|-------------|---------|----------------------------------|
| label         | string      |         |                                  |
| value         | string      |         |                                  |
| placeholder   | string      |         |                                  |
| disabled      | boolean     | false   |                                  |
| type          | `InputType` | `text`  |                                  |
| help          | string      |         |                                  |
| modifier      | string      |         | CssClass modifiers which will be generated in BEM style e.g. `success another` => `ssv-input--success ssv-input--another` e.g. success, error, warn                                  |

