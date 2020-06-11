import React, { useState, useEffect } from 'react';
import { CookiesContent } from './CookiesContent'

const COOKIE_CONSENT_PERSISTANCE_KEY = 'showCookieConsent';

export const CookiesConsent = () => {
  const hasAcceptedBefore = localStorage.getItem(COOKIE_CONSENT_PERSISTANCE_KEY);
  const [hasAccepted, setAccepted] = useState(hasAcceptedBefore ? JSON.parse(hasAcceptedBefore) : false);

  const handleAccept = () => {
    setAccepted(true);
    localStorage.setItem(COOKIE_CONSENT_PERSISTANCE_KEY, JSON.stringify(true));
  }

  return(
    hasAccepted 
    ? null 
    : <CookiesContent onAccept={ handleAccept }/>
  )
};