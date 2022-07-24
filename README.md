## Getting Started

To start using our Autosuggestion, first add an id `id="boost-search"` to your search textbox component

In your html file, add the following js and stylesheet files at the `<head>` section

```
<script defer="defer" src="/static/js/main.19984c7f.js"></script>
<link href="/static/css/main.f02e1369.css" rel="stylesheet" />
```

For example, your html would look like this

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <script defer="defer" src="/static/js/main.19984c7f.js"></script>
<link href="/static/css/main.f02e1369.css" rel="stylesheet" />
  </head>
  <body>
    <script>
      window.boostCommerce = {
        charactersLengthToSearch: 2,
        // hiddenBlocks: ["Suggestion", "Collection", "Product"],
        hiddenBlocks: [],
      };
    </script>
    <input
      type="text"
      id="boost-search"
      placeholder="Type 2 characters to search..."
    />
    <div id="root"></div>

  </body>
</html>
```

## Configuration

Our products support config in window variables, you can add it in an another script tag:

```
<script>
    window.boostCommerce = {
        charactersLengthToSearch: 2,
        // hiddenBlocks: ["Suggestion", "Collection", "Product"],
        hiddenBlocks: [],
    };
</script>
```

## Customization

To customize the layout, you can override the css begin with the class tooltip-popover, for example

```
.tooltip-popover {
    // YOUR CODE HERE
    width: 150px;
    height: 200px;
}
```
