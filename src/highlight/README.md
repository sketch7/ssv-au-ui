# Highlight
Value convertor which enables additional styling for matched phrases.

```html
<h1 innerhtml.bind="${ 'the hero will drown' | highlight: 'hero' : 'heading--highlighted'}"></h1>
```

### Parameters

| Name     | Type     | Default         | Required | Description                               |
|----------|----------|-----------------|----------|-------------------------------------------|
| phrase   | `string` | -               | yes      | Text phrase to compare.                   |
| cssClass | `string` | `"highlighted"` | no       | Css Class to be added on matched phrases. |