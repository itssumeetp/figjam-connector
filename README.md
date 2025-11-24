# Figma Plugin React Template with Mixpanel Analytics

![62862431-71537f00-bd0e-11e9-85db-d97c0fb729a4](https://user-images.githubusercontent.com/16322616/62862692-46b5f600-bd0f-11e9-93b0-75955d1de8f3.png)

This template contains the react example as shown on [Figma Docs](https://www.figma.com/plugin-docs/intro/), with some structural changes, extra tooling, and **integrated Mixpanel analytics** for tracking user interactions.

## Quickstart

- Run `yarn` to install dependencies.
- Run `yarn build:watch` to start webpack in watch mode.
- Open `Figma` -> `Plugins` -> `Development` -> `Import plugin from manifest...` and choose `manifest.json` file from this repo.

⭐ To change the UI of your plugin (the react code), start editing [App.tsx](./src/app/components/App.tsx).
⭐ To interact with the Figma API edit [controller.ts](./src/plugin/controller.ts).
⭐ Read more on the [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/).

## Development & Testing

### Running the Plugin in Figma

1. **Start the development build**
   ```bash
   yarn build:watch
   ```
   This runs webpack in watch mode, which will automatically rebuild your plugin whenever you make changes to the code.

2. **Import the plugin into Figma**
   - Open the Figma desktop app
   - Go to `Plugins` → `Development` → `Import plugin from manifest...`
   - Navigate to this project folder and select the `manifest.json` file
   - Your plugin will now appear in the Development section

3. **Run your plugin**
   - In Figma, go to `Plugins` → `Development` → `[Your Plugin Name]`
   - The plugin UI will open and you can test your functionality

### Development Workflow

- **Making changes**: Edit your code in [src/app/components/](./src/app/components/) for UI changes or [src/plugin/controller.ts](./src/plugin/controller.ts) for Figma API interactions
- **Hot reload**: With `yarn build:watch` running, your changes will automatically rebuild
- **Testing changes**: After the build completes, close and reopen your plugin in Figma to see the updates
- **Console logs**: Open the Developer Console in Figma (`Plugins` → `Development` → `Open Console`) to see console.log output and debug errors

### Debugging Tips

- Use `console.log()` throughout your code - logs will appear in Figma's Developer Console
- Mixpanel events are logged to the console by default (see [analytics.ts](./src/app/components/analytics.ts:21))
- If your plugin doesn't appear, make sure the build completed successfully (check the terminal for errors)
- If changes aren't showing up, try restarting Figma

### Building for Production

When you're ready to publish your plugin:

```bash
yarn build
```

This creates an optimized production build in the `dist` folder.

## Toolings

This repo is using:

- React + Webpack
- TypeScript
- Prettier precommit hook
- Mixpanel Analytics (via `mixpanel-figma`)

## Mixpanel Analytics Integration

This template comes with pre-configured Mixpanel analytics to help you track user interactions and understand how users engage with your Figma plugin.

### Setting Up Your Mixpanel Project

1. **Create a Mixpanel Account**
   - Go to [mixpanel.com](https://mixpanel.com) and sign up for a free account
   - Create a new project for your Figma plugin

2. **Get Your Project Token**
   - In your Mixpanel project, go to **Settings** → **Project Settings**
   - Copy your **Project Token**

3. **Update the Analytics Configuration**
   - Open [src/app/components/analytics.ts](./src/app/components/analytics.ts)
   - Replace the token in line 6 with your Mixpanel project token:
   ```typescript
   mixpanel.init('YOUR_MIXPANEL_TOKEN_HERE', {
     disable_cookie: true,
     disable_persistence: true,
   });
   ```

### Using Analytics in Your Plugin

The analytics service is already set up and ready to use. Here's how to track events:

```typescript
import analytics from './analytics';

// Track an event
analytics.track('Button Clicked', {
  buttonName: 'create',
  count: 5
});

// Identify a user
analytics.identify('user-id-123');
```

### Example Usage

See [App.tsx](./src/app/components/App.tsx) for example implementations:

```typescript
const onCreate = () => {
  const count = parseInt(textbox.current.value, 10);
  analytics.track('Create Button Clicked', { count });
  // ... rest of your logic
};
```

### Important Notes

- The configuration includes `disable_cookie: true` and `disable_persistence: true`, which are **required** for Figma plugins
- Events are logged to the console for debugging (see [analytics.ts](./src/app/components/analytics.ts) line 21)
- Errors are caught gracefully to prevent breaking your plugin if analytics fail
