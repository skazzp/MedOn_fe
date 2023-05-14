import { Event } from 'react-big-calendar';
import { theme } from 'styles/theme';

export function getEventPropGetter(myTheme: typeof theme) {
  return function eventPropGetter(eventProps: Event) {
    const bgColor = eventProps.resource.isColor
      ? myTheme.colors.purple
      : myTheme.colors.blue_500;
    const style = { backgroundColor: bgColor };

    return { style };
  };
}
