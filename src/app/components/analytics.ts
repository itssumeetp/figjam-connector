import * as mixpanel from 'mixpanel-figma';

class Analytics {
  constructor() {
    try {
      mixpanel.init('f905512e3cb51d23b85fb5766ceb8624', {
        disable_cookie: true, // Required for Figma plugins
        disable_persistence: true, // Required for Figma plugins
      });
      // Optionally, you can log initialization
      // console.log('Mixpanel initialized');
    } catch (e) {
      // Optionally, you can log errors
      // console.error('Mixpanel failed to initialize', e);
    }
  }

  track(event: string, properties?: object) {
    try {
      mixpanel.track(event, properties);
      console.log(`[Mixpanel] Event tracked: ${event}`, properties);
    } catch (e) {
      // Optionally, you can log errors
      // console.error('Mixpanel failed to track event', e);
    }
  }

  identify(id: string) {
    try {
      mixpanel.identify(id);
      console.log(`[Mixpanel] User identified: ${id}`);
    } catch (e) {
      // Optionally, you can log errors
      // console.error('Mixpanel failed to identify', e);
    }
  }
}

const analytics = new Analytics();
export default analytics; 