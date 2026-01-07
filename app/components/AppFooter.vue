<template>
  <footer class="relative bg-[#0f172a] text-gray-300 overflow-hidden border-t border-white/10">
    <UContainer class="relative z-10 pt-16 pb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        <div class="space-y-8">
          <div class="flex items-center gap-6">
            <div class="w-16 h-16">
               <NuxtImg src="/img/logo_certifie.jpg" alt="dgml" class="w-full h-full object-contain brightness-200" />
            </div>
            <div class="w-20 border-l border-gray-600 pl-4">
               <div class="text-[10px] font-bold text-white leading-tight">
                 ISO 9001<br/>
                 <span class="text-blue-400">CERTIFIED</span>
               </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-white font-bold text-base leading-snug uppercase tracking-tight">
              Direction Générale du Matériel et de la Logistique du Bénin
            </h3>
          </div>

          <div class="space-y-4">
            <p class="text-[11px] tracking-widest font-bold text-gray-400 uppercase">Suivez-nous</p>
            <div class="flex gap-3">
              <UButton 
                v-for="social in ['facebook', 'twitter', 'linkedin']" 
                :key="social"
                variant="ghost"
                square
                class="bg-white/5 hover:bg-white/10 text-white rounded-full p-2"
              >
                <UIcon :name="`i-simple-icons-${social}`" class="w-4 h-4" />
              </UButton>
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-white text-sm font-bold mb-8 uppercase tracking-wider">
            E-SERVICES
          </h4>
          <ul class="space-y-3 text-[13px]">
            <li v-for="service in eServices" :key="service.name" class="flex items-start gap-2 group cursor-pointer">
              <span class="text-white font-bold">•</span>
              <ULink 
                :to="service.link" 
                class="hover:text-white transition-colors duration-300"
              >
                {{ service.name }}
              </ULink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-white text-sm font-bold mb-8 uppercase tracking-wider">
            LIENS UTILES
          </h4>
          <ul class="space-y-3 text-[13px]">
            <li v-for="link in liensUtiles" :key="link.name" class="flex items-start gap-2 group cursor-pointer">
              <span class="text-white font-bold">•</span>
              <ULink 
                :to="link.link" 
                class="hover:text-white transition-colors duration-300"
              >
                {{ link.name }}
              </ULink>
            </li>
          </ul>
        </div>

        <div class="space-y-10">
          <div>
            <h4 class="text-white text-sm font-bold mb-6 uppercase tracking-wider">MÉDIATHÈQUE</h4>
            <ul class="space-y-3 text-[13px]">
              <li v-for="media in mediatheque" :key="media.name" class="flex items-start gap-2 group cursor-pointer">
                <span class="text-white font-bold">•</span>
                <ULink :to="media.link" class="hover:text-white transition-colors">
                  {{ media.name }}
                </ULink>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-white text-sm font-bold mb-6 uppercase tracking-wider">Contact</h4>
            <div class="space-y-5 text-[13px]">
              <div class="flex gap-4 items-start">
                <UIcon name="i-heroicons-map-pin" class="text-white w-5 h-5 flex-shrink-0 mt-0.5" />
                <p class="leading-relaxed">
                  BP: 40 Cotonou, <br/>ROUTE DE L'AEROPORT
                </p>
              </div>
              <div class="flex gap-4 items-start">
                <UIcon name="i-heroicons-phone" class="text-white w-5 h-5 flex-shrink-0 mt-0.5" />
                <p class="leading-relaxed">
                  (229) 0121301937 / 0121308542 <br/>
                  <span class="text-[11px] text-gray-500">De 8h à 12h30 et de 14h à 17h30</span>
                </p>
              </div>
              <div class="flex gap-4 items-start">
                <UIcon name="i-heroicons-envelope" class="text-white w-5 h-5 flex-shrink-0 mt-0.5" />
                <ULink to="mailto:courriers@dgml.bj" class="hover:text-white transition-colors">
                  courriers@dgml.bj
                </ULink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-gray-400">
        <p>© Direction Générale du Matériel et de la Logistique - {{ new Date().getFullYear() }}</p>
        <div class="flex gap-6">
          <ULink to="#" class="text-[#eab308] font-medium hover:underline tracking-tight">Mentions légales et gestion des cookies</ULink>
        </div>
      </div>
    </UContainer>

    <div class="flex h-1.5 w-full">
      <div class="bg-[#008751] flex-1"></div>
      <div class="bg-[#fcd116] flex-1"></div>
      <div class="bg-[#e8112d] flex-1"></div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const eServices = [
  { name: 'e-Garage', link: '#' },
]

const liensUtiles = [
  { name: 'Gouvernement du Bénin', link: '#' },
  { name: 'Secrétariat Général du Gouvernement', link: '#' },
  { name: 'Présidence de la République', link: '#' },
  { name: 'Ministère de l\'Économie et des Finances', link: '#' },
  { name: 'SIGFP', link: '#' },
]

const mediatheque = [
  { name: 'Galerie photo', link: '#' },
]
</script>