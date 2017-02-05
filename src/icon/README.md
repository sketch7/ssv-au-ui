[fontawesome]: http://fontawesome.io/icons/
# Icon
Display's an icon with optional configuration.
Default implementation is using [Font Awesome][fontawesome] icons.

## Usage

```html
<!-- simple -->
<ssv-icon name="address-book" ></ssv-icon>

<!-- size -->
<ssv-icon size="medium" name="address-book"></ssv-icon>

<!-- additional options -->
<ssv-icon color="info" size="medium" name="address-book"></ssv-icon>
```

### Attributes

| Name              | Type               | Default | Required | Description                                                                                                                |
|-------------------|--------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------|
| name              | string             | -       | yes      | Icon name to be displayed.                                                                                                 |
| color             | string             | -       | no       | Color variant. Can be `primary`, `accent`, `danger`, `warn`, `success`, `info` or any other custom.                        |
| size              | `ElementSize`      | xsmall  | no       | Icon size. It can be `xsmall`, `small`, `medium`, `large`, `xlarge`, `xxlarge` or any other custom.                        |
| prefix            | string             | fa-     | no       | Append prefix  with the name. e.g.: prefix="`fa-`" and  name="`addressbook`"  => `fa-addressbook`.                         |
| defaultClass      | defaultClass       | fa      | no       | Append additional class with element.                                                                                      |
| modifier          | string             | -       | no       | CssClass modifiers which will be generated in BEM style e.g. `awesome super` => `ssv-icon__i--awesome ssv-icon__i--super`. |

## Global Configuration
Options which can be configured globally.

| Name              | Type                 | Default | Description                                                                       |
|-------------------|----------------------|---------|-----------------------------------------------------------------------------------|
| color             | string               | -       |                                                                                   |
| size              | `ElementSize`        | xsmall  |                                                                                   |
| strictElementSize | boolean              | true    | Restrict size to be: `xsmall`, `small`, `medium`, `large`, `xlarge` or `xxlarge`. |
| prefix            | string               | fa-     |                                                                                   |
| defaultClass      | string               | fa      |                                                                                   |
| aliases           | `Dictionary<string>` | -       | Create an alias for icons e.g: `save`: `floppy-o`.                                |