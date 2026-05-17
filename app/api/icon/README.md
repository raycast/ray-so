# Icon Generator API

This API endpoint generates customizable icon backgrounds programmatically. It accepts query parameters to customize the icon appearance and returns an SVG image.

## Endpoint

```
GET /api/icon
```

## Query Parameters

### Background Fill

- `backgroundFillType` - Fill type: `Solid`, `Linear`, or `Radial` (default: `Linear`)
- `backgroundStartColor` - Primary color in hex format (default: `#FF6363`)
- `backgroundEndColor` - Secondary color for gradients (default: `#FFA07A`)
- `backgroundAngle` - Gradient angle in degrees for Linear fill (default: `45`)
- `backgroundPosition` - Position for Radial gradient as `x%,y%` (default: `50%,50%`)
- `backgroundSpread` - Spread percentage for Radial gradient (default: `80`)

### Background Style

- `backgroundRadius` - Corner radius in pixels (default: `128`)
- `backgroundStrokeSize` - Border width in pixels (default: `0`)
- `backgroundStrokeColor` - Border color in hex format (default: `#000000`)
- `backgroundStrokeOpacity` - Border opacity 0-100 (default: `100`)
- `backgroundRadialGlare` - Enable radial glare effect: `true` or `false` (default: `false`)

### Icon

- `icon` - Icon name from Raycast icons (default: `Dots`)
  - Use kebab-case names like `airplane`, `star`, `folder`, etc.
  - See available icons at https://www.raycast.com/icons
- `iconColor` - Icon color in hex format (default: `#FFFFFF`)
- `iconSize` - Icon size in pixels (default: `256`)
- `iconOffsetX` - Horizontal offset in pixels (default: `0`)
- `iconOffsetY` - Vertical offset in pixels (default: `0`)

### Output

- `size` - Output size in pixels (default: `512`)

## Examples

### Basic Icon with Gradient

```bash
curl "http://localhost:3000/api/icon?icon=airplane&backgroundStartColor=%23FF6363&backgroundEndColor=%23FFA07A"
```

### Solid Color Background

```bash
curl "http://localhost:3000/api/icon?icon=star&backgroundFillType=Solid&backgroundStartColor=%234A90E2&size=256"
```

### Radial Gradient

```bash
curl "http://localhost:3000/api/icon?icon=folder&backgroundFillType=Radial&backgroundStartColor=%23FF6B6B&backgroundEndColor=%234ECDC4&backgroundSpread=60"
```

### With Border and Glare

```bash
curl "http://localhost:3000/api/icon?icon=heart&backgroundRadialGlare=true&backgroundStrokeSize=8&backgroundStrokeColor=%23FFFFFF&backgroundStrokeOpacity=50"
```

## Response

The API returns an SVG image with `Content-Type: image/svg+xml`.

## Error Responses

### Invalid Icon

```json
{
  "error": "Icon \"invalid-name\" not found",
  "availableIcons": ["add-person", "airplane", "..."],
  "totalIcons": 603
}
```

### Server Error

```json
{
  "error": "Failed to generate icon",
  "details": "Error message"
}
```

## Notes

- Icon rendering uses a placeholder circle. For full icon rendering with actual Raycast icon paths, use the web interface at `/icon`
- All color values should be URL-encoded (e.g., `#FF6363` becomes `%23FF6363`)
- The API includes aggressive caching headers for performance
- SVG output can be easily converted to PNG using tools like ImageMagick or browser APIs

## Integration Example

### HTML

```html
<img
  src="/api/icon?icon=airplane&backgroundStartColor=%23FF6363&backgroundEndColor=%23FFA07A&size=256"
  alt="Custom Icon"
/>
```

### JavaScript

```javascript
const iconUrl = new URL("/api/icon", window.location.origin);
iconUrl.searchParams.set("icon", "star");
iconUrl.searchParams.set("backgroundStartColor", "#4A90E2");
iconUrl.searchParams.set("size", "512");

fetch(iconUrl)
  .then((response) => response.text())
  .then((svg) => {
    // Use the SVG
    document.getElementById("icon-container").innerHTML = svg;
  });
```
