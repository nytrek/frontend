/**
 * @see https://stackoverflow.com/questions/60411351/how-to-use-google-analytics-with-next-js-app
 */
export type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

/**
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/events
 */
export const event = ({ action, category, label, value }: GTagEvent): void => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
