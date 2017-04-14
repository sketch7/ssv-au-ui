# select
Enhances the native HTML `<select>` with styling and extra features.

## Usage

```html
<!-- simple -->
<ssv-select 
    options.bind="options"
    selected.bind="selectedItem"
    placeholder="select game">
</ssv-select>

<!-- basic options -->
<ssv-select 
    options.bind="heroes"
    text-field="name"
    value-field="id"
    selected.bind="heroSelected"
    placeholder="select hero">
</ssv-select>

<!-- multi select -->
<ssv-select options.bind="options" 
    type="multi"
    auto-close="false"
    placeholder="select game"
    selected.bind="optionsSelected"
    color="primary">
</ssv-select>

<!-- handling select change event -->
<ssv-select options.bind="options"
    placeholder="select game"
    change.delegate="onChange($event)">
</ssv-select>
```

```ts
onChange(event: CustomEvent) {
    console.log("onChange::triggered", {
        previous: event.detail.previous,
        value: event.detail.value
    });
}
```

### Attributes

| Name               | Type             | Default                  | Required | Description                                                                                                              |
|--------------------|------------------|--------------------------|----------|--------------------------------------------------------------------------------------------------------------------------|
| options            | `any[]`          | -                        | yes      | Options available in the list. This could be a primitive array (eg: `string[]`) or complex type array (eg: `Hero[]`).    |
| selected           | `any` or `any[]` | -                        | yes      | Currently selected options.                                                                                              |
| type               | `SelectType`     | `single`                 | no       | Can be `single` or `multi`. This will allow single or multi selection.                                                   |
| placeholder        | `string`         | -                        | no       | Placeholder text to show when input is empty.                                                                            |
| text-field         | `string`         | `"text"`                 | no       | Text property name, which will be used as a select display text.                                                         |
| value-field        | `string`         | `"value"`                | no       | Value property name, which will be used as a select value.                                                               |
| groupby            | `string`         | -                        | no       | Groupby property name, which will be used to group the options with.                                                     |
| max-selections     | `number`         | -                        | no       | Multi select - numbers of allowed options selected at once.                                                              |
| selected-class     | `string`         | `"selected"`             | no       | CssClass to be used for selected items.                                                                                  |
| auto-close         | `boolean`        | `true`                   | no       | Determines whether after selecting an item it will close or not.                                                         |
| allow-clear        | `boolean`        | `true`                   | no       | Determines whether it allows you to clear all selections or not.                                                         |
| allow-filtering    | `boolean`        | `true`                   | no       | Determines whether it allows you to filter options or not.                                                               |
| filter-placeholder | `string`         | `"filter options..."`    | no       | Set filter placeholder text.                                                                                             |
| no-options         | `string`         | `"no options available"` | no       | Set no options text.                                                                                                     |
| color              | `string`         | -                        | no       | Color variant. Can be `primary`, `accent`, `danger`, `warn`, `success`, `info` or any other custom.                      |
| disabled           | `boolean`        | `false`                  | no       | Determines whether is disabled or not.                                                                                   |
| modifier           | `string`         | -                        | no       | CssClass modifiers which will be generated in BEM style e.g. `awesome super` => `ssv-select--awesome ssv-select--super`. |

## Global Configuration
Options which can be configured globally.

| Name              | Type         | Default                  | Description                                              |
|-------------------|--------------|--------------------------|----------------------------------------------------------|
| type              | `SelectType` | `single`                 | Refer to attribute description.                          |
| textField         | `string`     | `"text"`                 | Refer to attribute description.                          |
| valueField        | `string`     | `"value"`                | Refer to attribute description.                          |
| selectedClass     | `string`     | `"selected"`             | Refer to attribute description.                          |
| autoClose         | `boolean`    | `true`                   | Refer to attribute description.                          |
| allowClear        | `boolean`    | `true`                   | Refer to attribute description.                          |
| allowFiltering    | `boolean`    | `true`                   | Refer to attribute description.                          |
| filterPlaceholder | `string`     | `"filter options..."`    | Refer to attribute description.                          |
| noOptions         | `string`     | `"no options available"` | Refer to attribute description.                          |
| color             | `string`     | -                        | Refer to attribute description.                          |
| arrowUpIcon       | `string`     | `"chevron-up"`           | Select arrow icon when the select state is closed.       |
| arrowDownIcon     | `string`     | `"chevron-down"`         | Select arrow icon when the select state is open.         |
| clearIcon         | `string`     | `"times"`                | Select clear icon which is used to clear all selections. |

## TODO Features
- Tagging