import React from 'react';
import { Helmet } from 'react-helmet';

export const SEO = () => {
    return(
    <Helmet>
        <title>Terapeuta Gestalt en Palma de Mallorca - Sebastià Limones | Terapia Gestalt en Palma</title>
        <meta name="description" content="Sebastià Limones, Terapeuta Gestalt en Palma de Mallorca, ofrece terapia Gestalt profesional para ayudarte a mejorar tu bienestar emocional y personal." />
        <meta name="theme-color" content="#000000" />
        <meta name="google-site-verification" content="JQ-Wn5QWDy7KLLuZfrVOtBLrm6kv5kv_jQnO4ub-Tg4" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Gravitas+One" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Lora" rel="stylesheet" />
        <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-116717699-1"></script>
        <script type="application/ld+json">
        {`
            {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Sebastià Limones",
            "jobTitle": "Terapeuta Gestalt",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Palma de Mallorca",
                "addressRegion": "PM",
                "addressCountry": "ES"
            },
            "description": "Sebastià Limones, Terapeuta Gestalt en Palma de Mallorca, ofrece terapia Gestalt profesional para ayudarte a mejorar tu bienestar emocional y personal.",
            "url": "https://yourwebsite.com"
            }
        `}
        </script>
    </Helmet>   
  );
};