<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    let open = false;
    let corsiOpen = false;
    let scrolled = false;
    let hideTimer;

    onMount(() => {
        const onScroll = () => (scrolled = window.scrollY > 60);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    });

    $: if (typeof document !== "undefined") {
        document.body.style.overflow = open ? "hidden" : "";
    }

    $: if ($page.url.pathname || $page.url.hash) open = false;

    const links = [
        { href: "/danza", label: "Danza" },
        { href: "/fitness", label: "Fitness" },
        { href: "/stage", label: "Stage" },
        { href: "/#insegnanti", label: "Insegnanti" },
        { href: "/galleria", label: "Galleria" },
    ];

    const openCorsi = () => { clearTimeout(hideTimer); corsiOpen = true; };
    const closeCorsi = () => { hideTimer = setTimeout(() => (corsiOpen = false), 180); };
</script>

<svelte:window on:keydown={(e) => e.key === "Escape" && (open = false)} />

<nav
        class="fixed top-0 inset-x-0 z-[100] transition-all duration-500
           {scrolled || open
              ? 'bg-white/90 backdrop-blur-md shadow-sm text-neutral-900'
              : 'bg-gradient-to-b from-black/50 to-transparent text-white'}"
        aria-label="Menu principale"
>
    <div class="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between
                transition-all duration-500 {scrolled ? 'h-16 lg:h-20' : 'h-20 lg:h-28'}">

        <a href="/" aria-label="Home - LABballet ASD" class="flex items-center gap-3 shrink-0">
            <img
                    src="/images/logo.webp" alt="LABballet ASD"
                    width="96" height="96" loading="eager"
                    class="aspect-square transition-all duration-500
                       {scrolled ? 'w-10 lg:w-12' : 'w-12 lg:w-16'}"
            />
            <span class="hidden sm:block  text-lg lg:text-xl tracking-tight">
                LABballet
            </span>
        </a>

        <!-- Desktop -->
        <ul class="hidden lg:flex items-center gap-9 text-[11px] uppercase tracking-[0.18em]">
            <li class="relative" on:mouseenter={openCorsi} on:mouseleave={closeCorsi}>
                <a href="/#corsi" class="link-underline py-2 inline-block">Corsi</a>

                {#if corsiOpen}
                    <ul class="absolute left-0 top-full pt-4 min-w-[180px]">
                        <div class="bg-white text-neutral-900 shadow-xl border border-black/5 py-2">
                            <li><a href="/danza" class="block px-5 py-2.5 hover:bg-neutral-100 transition-colors">Danza</a></li>
                            <li><a href="/fitness" class="block px-5 py-2.5 hover:bg-neutral-100 transition-colors">Fitness</a></li>
                        </div>
                    </ul>
                {/if}
            </li>

            {#each links.slice(2) as l}
                <li><a href={l.href} class="link-underline py-2 inline-block">{l.label}</a></li>
            {/each}

            <li>
                <a href="/#orari"
                   class="border px-5 py-2.5 transition-colors
                          {scrolled ? 'border-neutral-900 hover:bg-neutral-900 hover:text-white'
                                    : 'border-white/70 hover:bg-white hover:text-neutral-900'}">
                    Orari
                </a>
            </li>
        </ul>

        <!-- Hamburger -->
        <button
                class="lg:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-[6px] -mr-2"
                on:click={() => (open = !open)}
                aria-label={open ? "Chiudi menu" : "Apri menu"}
                aria-expanded={open}
        >
            <span class="block h-[1.5px] w-7 bg-current transition-all duration-300
                         {open ? 'translate-y-[7.5px] rotate-45' : ''}"></span>
            <span class="block h-[1.5px] w-7 bg-current transition-all duration-300
                         {open ? 'opacity-0' : ''}"></span>
            <span class="block h-[1.5px] w-7 bg-current transition-all duration-300
                         {open ? '-translate-y-[7.5px] -rotate-45' : ''}"></span>
        </button>
    </div>
</nav>

<!-- Overlay mobile a tutto schermo -->
<div
        class="lg:hidden fixed inset-0 z-[99] bg-white transition-all duration-500
           {open ? 'opacity-100 visible' : 'opacity-0 invisible'}"
>
    <div class="h-full flex flex-col justify-center px-8 pt-20">
        {#each links as l, i}
            <a
            href={l.href}
            on:click={() => (open = false)}
            class="group border-b border-black/10 py-5 flex items-baseline gap-5
            transition-all duration-500
            {open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}"
            style="transition-delay: {open ? 120 + i * 60 : 0}ms"
            >
            <span class=" text-3xl tracking-tight">{l.label}</span>
            <span class="ml-auto text-neutral-300 group-hover:text-neutral-900 transition-colors">→</span>
            </a>
        {/each}

        <div
                class="mt-10 transition-all duration-500 {open ? 'opacity-100' : 'opacity-0'}"
                style="transition-delay: {open ? 120 + links.length * 60 : 0}ms"
        >
            <p class="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                Via Borgo Belvedere 2 · Dello (BS)
            </p>
            <a href="/#orari" on:click={() => (open = false)}
               class="mt-5 inline-block border border-neutral-900 px-6 py-3
                      text-[11px] uppercase tracking-[0.2em]">
                Orari e contatti
            </a>
        </div>
    </div>
</div>

<style>
    .link-underline { position: relative; }
    .link-underline::after {
        content: "";
        position: absolute;
        left: 0; bottom: 0;
        width: 100%; height: 1px;
        background: currentColor;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform .4s cubic-bezier(.16,1,.3,1);
    }
    .link-underline:hover::after {
        transform: scaleX(1);
        transform-origin: left;
    }
</style>