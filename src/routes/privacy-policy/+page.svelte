<script>
    let lang = "it";

    const policy = {
        it: `
    <h1 class="text-3xl font-bold mb-4">Privacy Policy</h1>
    <p class="mb-4 text-red-600 font-semibold">
      Questo sito non raccoglie dati personali e non utilizza cookie.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-2">1. Finalità e trasparenza</h2>
    <p class="mb-4">
      Il sito <strong>labballet.it</strong> ha finalità puramente informative e non raccoglie né tratta dati personali degli utenti.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-2">2. Servizi di terze parti</h2>
    <p class="mb-2">
      Sono utilizzati solo servizi esterni essenziali per il corretto funzionamento del sito:
    </p>
    <ul class="list-disc list-inside mb-4">
      <li><strong>Cloudflare</strong>: sicurezza e distribuzione dei contenuti</li>
      <li><strong>Google Fonts</strong>: caricamento dei font</li>
      <li><strong>Font Awesome</strong>: icone grafiche</li>
      <li><strong>WhatsApp Business Widget</strong>: per contatti diretti su richiesta dell’utente</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-6 mb-2">3. Cookie</h2>
    <p class="mb-4">
      Il sito non utilizza cookie di alcun tipo, né propri né di terze parti.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-2">4. Diritti dell’utente</h2>
    <p class="mb-4">
      Non essendo effettuata alcuna raccolta di dati personali, non sono applicabili i diritti previsti dal GDPR in riferimento al trattamento dei dati da parte di questo sito.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-2">5. Contatti</h2>
    <p class="mb-4">
      Per qualsiasi chiarimento, è possibile contattare il titolare del sito via WhatsApp attraverso l’apposito widget.
    </p>
  `,
        en: `
    <h1 class="text-3xl font-bold mb-4">Privacy Policy</h1>
    <p class="mb-4 text-red-600 font-semibold">
      This website does not collect personal data and does not use cookies.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-2">1. Purpose and transparency</h2>
    <p class="mb-4">
      The website <strong>labballet.it</strong> is purely informational and does not collect or process any personal data from users.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-2">2. Third-party services</h2>
    <p class="mb-2">
      Only external services essential for the site's functionality are used:
    </p>
    <ul class="list-disc list-inside mb-4">
      <li><strong>Cloudflare</strong>: security and content delivery</li>
      <li><strong>Google Fonts</strong>: font loading</li>
      <li><strong>Font Awesome</strong>: graphic icons</li>
      <li><strong>WhatsApp Business Widget</strong>: for user-initiated contact</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-6 mb-2">3. Cookies</h2>
    <p class="mb-4">
      This site does not use any cookies, neither proprietary nor third-party.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-2">4. User rights</h2>
    <p class="mb-4">
      As no personal data is collected, GDPR rights regarding data processing are not applicable for this website.
    </p>

    <h2 class="text-2xl font-semibold mt-6 mb-2">5. Contact</h2>
    <p class="mb-4">
      For any questions, users can contact the site owner via WhatsApp through the widget.
    </p>
  `,
    };

    let policyContainer;

    $: if (policyContainer) {
        policyContainer.innerHTML = policy[lang];
    }
</script>

<div class="max-w-3xl mx-auto p-6 font-sans leading-relaxed text-gray-800">
    <div class="flex justify-end mb-6 space-x-2">
        <button
            class="btn px-4 py-2 disabled:opacity-50"
            on:click={() => (lang = "it")}
            disabled={lang === "it"}
            aria-label="Switch to Italian"
        >
            Italiano
        </button>
        <button
            class="btn px-4 py-2 disabled:opacity-50"
            on:click={() => (lang = "en")}
            disabled={lang === "en"}
            aria-label="Switch to English"
        >
            English (US)
        </button>
    </div>

    <section class="prose prose-lg" bind:this={policyContainer}></section>
</div>
