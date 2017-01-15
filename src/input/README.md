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
    class="success">
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

