<script>
  import { Mail, Phone, MapPin, Building2 } from "lucide-svelte";
</script>

<footer class="bg-neutral text-neutral-content pt-12 pb-8">
  <div class="max-w-6xl mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div>
        <h3 class="footer-title text-primary mb-3 text-lg font-semibold">
          Contatti
        </h3>
        <ul class="space-y-2">
          <li>
            <a
              href="mailto:labballetasd@gmail.com"
              class="flex items-center gap-2 hover:text-accent"
            >
              <Mail class="w-5 h-5" /> labballetasd@gmail.com
            </a>
          </li>
          <li>
            <a
              href="tel:+393470558313"
              class="flex items-center gap-2 hover:text-accent"
            >
              <Phone class="w-5 h-5" /> +39 347 055 8313
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="footer-title text-primary mb-3 text-lg font-semibold">
          Indirizzo
        </h3>
        <ul class="space-y-2">
          <li class="flex items-center gap-2">
            <MapPin class="w-5 h-5" />
            <a
              href="https://www.google.it/maps/place/..."
              target="_blank"
              class="hover:text-accent"
            >
              Via Borgo Belvedere, 10
            </a>
          </li>
          <li class="flex items-center gap-2">
            <Building2 class="w-5 h-5" /> Dello, Italy
          </li>
        </ul>
      </div>

      <div class="flex flex-col gap-4 justify-between h-full">
        <div>
          <h3 class="footer-title text-primary mb-3 text-lg font-semibold">
            Seguici
          </h3>
          <div class="flex gap-8 text-3xl">
            <a
              href="https://www.facebook.com/LABballet/?locale=it_IT"
              class="hover:text-accent transition-transform duration-200 transform hover:scale-125"
              target="_blank"
              aria-label="Facebook"
            >
              <div class="w-8 h-8">
                <img src="images/icons/facebook.svg" alt="" />
              </div>
            </a>
            <a
              href="https://www.instagram.com/labballet/?hl=it"
              class="hover:text-accent transition-transform duration-200 transform hover:scale-125"
              target="_blank"
              aria-label="Instagram"
            >
              <div class="w-8 h-8">
                <img src="images/icons/instagram.svg" alt="" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
