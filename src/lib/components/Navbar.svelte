<script>
    import { onMount } from "svelte";

    let dropdown;
    let mobileMenuToggle;
    let isHovering = false;

    const closeDropdown = () => {
        if (!isHovering && dropdown) dropdown.open = false;
        if (mobileMenuToggle) mobileMenuToggle.checked = false;
    };

    onMount(() => {
        mobileMenuToggle = document.getElementById("mobile-menu-toggle");

        const handleClickOutside = (event) => {
            if (dropdown && !dropdown.contains(event.target) && dropdown.open) {
                closeDropdown();
            }
        };

        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    });
</script>

<nav
    class="navbar fixed top-0 z-100 backdrop-blur-sm transition-all duration-300 bg-[rgba(23,24,26,0.39)] h-5 lg:h-24"
    id="navbar"
    aria-label="Menu principale"
>
    <div class="navbar-start">
        <a href="/" aria-label="Home">
            <img
                src="/images/logo.webp"
                alt="logo"
                width="96"
                height="96"
                loading="eager"
                class="w-18 lg:w-24 aspect-square p-2 lg:p-4"
            />
        </a>
    </div>

    <div
        class="navbar-center absolute left-1/2 transform -translate-x-1/2 hidden lg:flex"
    >
        <ul class="menu menu-horizontal px-1 gap-4">
            <li>
                <details
                    bind:this={dropdown}
                    on:mouseenter={() => {
                        if (window.innerWidth >= 1024) {
                            isHovering = true;
                            dropdown.open = true;
                        }
                    }}
                    on:mouseleave={() => {
                        if (window.innerWidth >= 1024) {
                            isHovering = false;
                            setTimeout(closeDropdown, 300); // Ritardo per permettere il passaggio al dropdown
                        }
                    }}
                >
                    <summary
                        class="text-white font-bold hover:text-red-500 cursor-pointer"
                        on:click={closeDropdown}
                    >
                        Corsi
                    </summary>
                    <ul
                        class="bg-base-100 p-2 z-50"
                        on:mouseenter={() => (isHovering = true)}
                        on:mouseleave={() => {
                            isHovering = false;
                            setTimeout(closeDropdown, 300);
                        }}
                    >
                        <li class="hover:text-red-500">
                            <a
                                class="!text-black"
                                href="/danza"
                                on:click={closeDropdown}>Danza</a
                            >
                        </li>
                        <li class="hover:text-red-500">
                            <a
                                class="!text-black"
                                href="/fitness"
                                on:click={closeDropdown}>Fitness</a
                            >
                        </li>
                    </ul>
                </details>
            </li>

            <li>
                <a href="/stage">Stage</a>
            </li>

            <li>
                <a href="/#insegnanti" class="hover:text-accent">Insegnanti</a>
            </li>
            <!--             <li><a href="/galleria" class="hover:text-accent">Galleria</a></li>
 -->
        </ul>
    </div>

    <!-- HAMBURGER a destra solo su mobile -->
    <div class="navbar-end lg:hidden">
        <div class="dropdown dropdown-end relative">
            <label
                tabindex="0"
                class="btn btn-ghost p-0 w-12 h-12 flex items-center justify-center"
                aria-label="Apri menu"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8 -scale-x-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                    />
                </svg>
            </label>
            <input
                type="checkbox"
                id="mobile-menu-toggle"
                class="hidden peer"
            />
            <ul
                class="menu menu-sm dropdown-content mt-3 z-40 p-2 shadow bg-base-100 rounded-box w-52"
                on:click={() => {
                    document.getElementById("mobile-menu-toggle").checked =
                        false;
                }}
            >
                <!-- Dropdown Corsi per mobile -->
                <li>
                    <a href="/#corsi">Corsi</a>
                    <ul class="p-2">
                        <li><a href="/danza">Danza</a></li>
                        <li><a href="/fitness">Fitness</a></li>
                    </ul>
                </li>
                <li><a href="/stage">Stage</a></li>
                <li><a href="/#insegnanti">Insegnanti</a></li>
                <!--                 <li><a href="/galleria">Galleria</a></li>
 -->
            </ul>
            <!-- Overlay per mobile menu -->
            <div
                class="fixed inset-0 bg-black bg-opacity-40 z-30 hidden peer-checked:block"
                tabindex="-1"
                aria-hidden="true"
            ></div>
        </div>
    </div>
</nav>
