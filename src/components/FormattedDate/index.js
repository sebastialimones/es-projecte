import { DateTime } from 'luxon';
import React from 'react';

export const FormattedDate = ({ date }) => (
  <span>{ DateTime.fromISO(date).setLocale('ca-ES').toLocaleString(DateTime.DATE_FULL) }</span>
)