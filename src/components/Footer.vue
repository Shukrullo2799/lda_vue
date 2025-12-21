<script setup lang="ts"></script>

<template>
  <footer class="bg-gray-900 text-gray-300 mt-16">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- About -->
        <div>
          <h3 class="text-white mb-4">
            {{ $t("footer.title") }}
          </h3>
          <p class="text-sm leading-relaxed">
            {{ $t("footer.description") }}
          </p>
        </div>

        <!-- Links -->
        <div>
          <h3 class="text-white mb-4">
            {{ $t("footer.information") }}
          </h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="#" class="hover:text-white transition-colors">
                {{ $t("footer.terms") }}
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors">
                {{ $t("footer.aboutSystem") }}
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors">
                {{ $t("footer.contacts") }}
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors">
                {{ $t("footer.help") }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-white mb-4">
            {{ $t("footer.contactTitle") }}
          </h3>
          <p class="text-sm leading-relaxed">
            {{ $t("footer.agencyName") }}<br />
            {{ $t("footer.agencySubName") }}<br />
            {{ $t("footer.location") }}<br />
            <a href="mailto:info@ihma.uz" class="hover:text-white transition-colors">
              info@ihma.uz
            </a>
          </p>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
        <p>
          © {{ new Date().getFullYear() }}
          {{ $t("footer.copyright") }}
        </p>
      </div>
    </div>
  </footer>
</template>
