import { Event } from 'react-big-calendar';
import { theme } from 'styles/theme';

export function getEventPropGetter({ resource }: Event) {
  const { colors } = theme;
  const bgColor = (resource.isColor && colors.purple) || colors.blue_500;
  const style = { backgroundColor: bgColor };

  return { style };
}
