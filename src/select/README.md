# select
Enhances the native HTML `<select>` with styling and extra features.

## Usage

```html
<!-- simple -->
<ssv-select 
    options.bind="options"
    selected.bind="selectedItem"
    placeholder="select game"></ssv-select>

<!-- basic options -->
<ssv-select 
    options.bind="heroes"
    text="name"
    value="id"
    selected.bind="heroSelected"
    placeholder="select hero"></ssv-select>

<!-- multi select -->
<ssv-select options.bind="options" 
    type="multi"
    auto-close="false"
    placeholder="select game"
    selected.bind="optionsSelected"
    color="primary"></ssv-select>

<!-- handling select change event -->
<ssv-select options.bind="options"
    placeholder="select game"
    change.delegate="onChange($event)"></ssv-select>

onChange(event: CustomEvent) {
    this.logger.debug("onChange", "triggered", {
        previous: event.detail.previous,
        value: event.detail.value
    });
}
```


### Attributes
| Name           | Type            | Default    | Required | Description                                                                                                              |
|----------------|-----------------|------------|----------|--------------------------------------------------------------------------------------------------------------------------|
| options        | `any[]`         | -          | yes      | Options available in the list, this could a simple list (eg: string[]) or complex object (eg: colors[]).                 |
| selected       | `any` | `any[]` | -          | yes      | Selected options that can be preset and set.                                                                             |
| type           | `SelectType`    | `single`   | no       | Can be `single` or `multi`. This will allow single or multi selection at the same time.                                  |
| placeholder    | `string`        | -          | no       | Placeholder text to show when input is empty.                                                                            |
| text           | `string`        | "text"     | no       | Text property name, which will be used as a select display text.                                                         |
| value          | `string`        | "value"    | no       | Value property name, which will be used as a select value.                                                               |
| groupby        | `string`        | -          | no       | Groupby property name, which will be used to group the options with.                                                     |
| selectedClass  | `string`        | "selected" | no       | This will be used as a selected class.                                                                                   |
| autoClose      | `boolean`       | true       | no       | Determines whether after selecting an item it will close or not.                                                         |
| allowClear     | `boolean`       | true       | no       | Determines whether it allows you to clear a selection or not.                                                            |
| allowFiltering | `boolean`       | true       | no       | Determines whether it allows you to filter selections or not.                                                            |
| color          | `string`        | -          | no       | Color variant. Can be `primary`, `accent`, `danger`, `warn`, `success` or any other custom.                              |
| disabled       | `boolean`       | false      | no       | Determines whether is disabled or not.                                                                                   |
| modifier       | `string`        | -          | no       | CssClass modifiers which will be generated in BEM style e.g. `awesome super` => `ssv-select--awesome ssv-select--super`. |

## Global Configuration
Options which can be configured globally.
| Name                   | Type         | Default                |
|------------------------|--------------|------------------------|
| type                   | `SelectType` | single                 |
| color                  | `string`     | -                      |
| filterPlaceholder      | `string`     | "filter options..."    |
| noOptionsAvailableText | `string`     | "no options available" |
| dataTextField          | `string`     | "text"                 |
| dataValueField         | `string`     | "value"                |
| selectedClass          | `string`     | "selected"             |
| autoClose              | `boolean`    | true                   |
| allowFiltering         | `boolean`    | true                   |
| allowClear             | `boolean`    | true                   |
| arrowUpIcon            | `string`     | "chevron-up"           |
| arrowDownIcon          | `string`     | "chevron-down"         |
| clearIcon              | `string`     | "times"                |

## TODO Features
- Tagging