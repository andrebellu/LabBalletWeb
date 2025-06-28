<div
  class="navbar fixed top-0 z-50 backdrop-blur-sm transition-all duration-300 bg-[rgba(121,125,133,0.1)]"
  id="navbar"
>
  <!-- LOGO sempre a sinistra -->
  <div class="navbar-start">
    <img src="logo.png" alt="" class="w-24 aspect-square p-4" />
  </div>

  <!-- MENU CENTRALE effettivamente centrato -->
  <div
    class="navbar-center absolute left-1/2 transform -translate-x-1/2 hidden lg:flex"
  >
    <ul class="menu menu-horizontal px-1 gap-4">
      <!-- Dropdown Corsi -->
      <li>
        <details>
          <summary class="text-white font-bold hover:text-red-500"
            >Corsi</summary
          >
          <ul class="bg-base-100 p-2 z-50">
            <li class="hover:text-red-500"><a class="!text-black">Danza</a></li>
            <li class="hover:text-red-500">
              <a class="!text-black">Fitness</a>
            </li>
          </ul>
        </details>
      </li>

      <li><a href="#insegnanti" class="hover:text-accent">Insegnanti</a></li>
      <li><a href="#contatti" class="hover:text-accent">Contatti</a></li>
      <li><a href="#galleria" class="hover:text-accent">Galleria</a></li>
    </ul>
  </div>

  <!-- HAMBURGER a destra solo su mobile -->
  <div class="navbar-end lg:hidden">
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 -scale-x-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
      <ul
        class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <!-- Dropdown Corsi per mobile -->
        <li>
          <a>Corsi</a>
          <ul class="p-2">
            <li><a href="#danza">Danza</a></li>
            <li><a href="#fitness">Fitness</a></li>
          </ul>
        </li>
        <li><a href="#insegnanti">Insegnanti</a></li>
        <li><a href="#contatti">Contatti</a></li>
        <li><a href="#galleria">Galleria</a></li>
      </ul>
    </div>
  </div>
</div>
