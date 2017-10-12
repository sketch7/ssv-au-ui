# Chips
Chips, with optional background colors.

## Usage

todo

### Attributes
| Name           | Type        | Default         | Required | Description                                                                                                              |
|----------------|-------------|-----------------|----------|--------------------------------------------------------------------------------------------------------------------------|
| options        | `any[]`     | -               | yes      | Options available as chips. This could be a primitive array (eg: `string[]`) or complex type array (eg: `Hero[]`).       |
| type           | `ChipType`  | `rounded`       | no       | Can be `label` or `rounded`. This will change the chip style.                                                            |
| textField      | `string`    | `"text"`        | no       | Text property name, which will be used as display text.                                                                  |
| valueField     | `string`    | `"value"`       | no       | Value property name, which will be used as chip value.                                                                   |
| removeField    | `string`    | `"allowRemove"` | no       | Remove property name, which will be used to check allow remove value.                                                    |
| iconImageField | `string`    | `"iconImage"`   | no       | Icon Image property name, which will be used for chip image source.                                                      |
| iconNameField  | `string`    | `"iconName"`    | no       | Icon Name property name, which will be used for chip icon.                                                               |
| iconTextField  | `string`    | `"iconText"`    | no       | Icon Text property name, which will be displayed in the chip image container.                                            |
| fillStyle      | `FillStyle` | `filled`        | no       | Can be `none` or `filled`. This will change the chip color.                                                              |
| focusStyle     | `FillStyle` | `filled`        | no       | Can be `none` or `filled`. This will change the chip color when focused.                                                 |
| color          | `string`    | -               | no       | Color variant. Can be `primary`, `accent`, `danger`, `warn`, `success`, `info` or any other custom.                      |
| allowRemove    | `boolean`   | `true`          | no       | Allow to remove chips.                                                                                                   |
| disabled       | `boolean`   | `false`         | no       | Determines whether is disabled or not.                                                                                   |
| modifier       | `string`    | -               | no       | CssClass modifiers which will be generated in BEM style e.g. `awesome super` => `ssv-select--awesome ssv-select--super`. |

## Global Configuration
Options which can be configured globally.

| Name           | Type        | Default         | Description                                 |
|----------------|-------------|-----------------|---------------------------------------------|
| type           | `ChipType`  | `rounded`       | Refer to attribute description.             |
| color          | `string`    | -               | Refer to attribute description.             |
| allowRemove    | `boolean`   | `true`          | Refer to attribute description.             |
| removeIcon     | `string`    | `times`         | Remove icon which is used to remove a chip. |
| textField      | `string`    | `"text"`        | Refer to attribute description.             |
| valueField     | `string`    | `"value"`       | Refer to attribute description.             |
| removeField    | `string`    | `"allowRemove"` | Refer to attribute description.             |
| iconImageField | `string`    | `"iconImage"`   | Refer to attribute description.             |
| iconNameField  | `string`    | `"iconName"`    | Refer to attribute description.             |
| iconTextField  | `string`    | `"iconText"`    | Refer to attribute description.             |
| fillStyle      | `FillStyle` | `"filled"`      | Refer to attribute description.             |
| focusStyle     | `FillStyle` | `"filled"`      | Refer to attribute description.             |