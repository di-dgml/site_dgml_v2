<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // Observer pour l'animation au scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  // Observer tous les éléments avec la classe scroll-reveal
  const elements = document.querySelectorAll('.scroll-reveal')
  elements.forEach(el => observer.observe(el))
})
</script>

<template>
  <div class="animate-fade-in -mt-25 -mb-25">
    <UPageSection class="animate-slide-in-up">
      <div class="mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- Header avec dégradé centré -->
        <div class="bg-linear-to-r from-[#0B5433] via-[#3a6470] to-[#5D73AD] p-8 md:p-10 text-white text-center">
          <div class="animate-fade-in-down">
            <h1 class="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
              Mot du Directeur Général
            </h1>
            <div class="flex justify-center mb-3">
              <div class="h-1.5 w-40 bg-white/70 rounded-full"></div>
            </div>
            <p class="text-lg md:text-xl font-light opacity-95 max-w-3xl mx-auto">
              Découvrez le message inspirant de notre Directeur Général sur la vision et les engagements de la DGML
            </p>
          </div>
        </div>

        <!-- Contenu principal -->
        <div class="p-6 md:p-12">
          <!-- Image flottante à gauche -->
          <img
            src="/img/DGML2-768x768.jpg.webp"
            alt="Raoufou MAMAM"
            class="float-left w-56 h-56 md:w-72 md:h-72 object-cover rounded-2xl shadow-2xl mr-7 md:mr-9 mb-7 animate-float border-4 border-white ring-4 ring-green-100"
          >

          <!-- Texte qui entoure l'image avec animation au scroll - TAILLES AJUSTÉES -->
           <!-- first-letter:text-7xl md:first-letter:text-8xl first-letter:font-bold first-letter:text-[#0B5433] first-letter:mr-1 first-letter:float-left -->
          <div class="max-w-none text-justify leading-relaxed space-y-5 text-gray-800">
            <p class="text-2xl md:text-3xl font-medium scroll-reveal delay-0">
              <span class="first-letter:text-7xl md:first-letter:text-8xl first-letter:font-bold first-letter:text-[#0B5433] first-letter:mr-1 first-letter:float-left">C</span>hers collègues, clients, partenaires et citoyens,
            </p>

            <p class="text-lg md:text-xl scroll-reveal delay-100">
              C'est un honneur pour moi de m'adresser à vous en tant que Directeur Général du Matériel et de la Logistique du Ministère de l'Économie et des Finances du Bénin.
            </p>

            <p class="text-lg md:text-xl scroll-reveal delay-200">
              Notre direction est fière de jouer un rôle important dans la gestion du patrimoine non financier de l'État. Nous sommes conscients de l'importance de notre mission régalienne et mesurons à juste titre nos responsabilités, car nos actions et réformes contribuent directement à l'efficacité, la transparence et la rationalité dans le fonctionnement de l'administration publique.
            </p>

            <p class="text-lg md:text-xl scroll-reveal delay-300">
              Je suis ravi de vous annoncer que dans la mise en œuvre de notre vision de « rationalisation, préservation et entretien des biens publics », nous avons engagé une démarche d'amélioration continue de la qualité de nos différentes prestations fondée sur les exigences de la norme ISO 9001 : 2015. Cet engagement pour l'excellence et la qualité dont l'objectif est d'accroître la performance de nos différents services, a été reconnu et couronné par la certification de la Direction Générale du Matériel et de la Logistique (DGML) à la norme ISO 9001 : 2015. C'est une réalisation significative qui démontre notre engagement continu envers l'amélioration de nos processus et de nos services pour mieux répondre aux besoins et attentes de nos clients et autres parties intéressées et pour rassurer nos concitoyens que la bonne gouvernance des matières de l'Etat est notre leitmotive.
            </p>

            <p class="text-lg md:text-xl scroll-reveal delay-400">
              C'est dans ce cadre que nous avons mis en place ce site web qui est un portail moderne devant nous permettre de communiquer efficacement sur les activités de notre direction, de partager des informations importantes avec vous et de renforcer notre interaction avec toutes nos parties intéressées.
            </p>

            <p class="text-lg md:text-xl scroll-reveal delay-500">
              Dans notre quête de performance continue et de transparence, nous souhaitons également recueillir vos commentaires, suggestions et idées. Votre rétroaction est essentielle pour que nous puissions continuer à nous améliorer et à mieux servir notre nation.
            </p>

            <p class="text-lg md:text-xl scroll-reveal delay-600">
              Je tiens à exprimer ma profonde gratitude à toute l'équipe de la DGML pour son engagement sans faille et son dévouement pour la réussite de notre mission commune. C'est grâce à son travail acharné que nous pouvons progresser vers de nouveaux succès.
            </p>

            <p class="text-lg md:text-xl scroll-reveal delay-700">
              Enfin, je vous invite tous à explorer notre site web et à rester informer sur nos activités, nos réformes et nos projets. Ensemble, nous bâtissons un avenir meilleur pour le Bénin.
            </p>

            <p class="text-lg md:text-xl scroll-reveal delay-800">
              Avec mes meilleures salutations.
            </p>
          </div>

          <!-- Signature stylisée - TAILLES AJUSTÉES -->
          <div class="mt-14 pt-7 border-t-2 border-gray-200 flex justify-end scroll-reveal delay-900">
            <div class="text-right">
              <div class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0B5433] to-[#5D73AD] mb-2">
                Raoufou MAMAM
              </div>
              <div class="text-base md:text-lg text-gray-700 font-semibold">
                Directeur Général du Matériel et de la Logistique
              </div>
              <div class="text-sm md:text-base text-gray-600 mt-1">
                Administrateur des Banques et Institutions Financières
              </div>
              <div class="mt-3 text-sm md:text-base text-gray-500 space-y-1">
                <div>📧 rmamam@finances.bj</div>
                <div>📍 Les Cocotiers, Avenue, Cotonou, Bénin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UPageSection>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1.2s ease-in-out;
}

.animate-fade-in-down {
  animation: fadeInDown 1s ease-out;
}

.animate-slide-in-up {
  animation: slideInUp 1s ease-out;
}

.animate-float {
  animation: float 6s ease-in-out;
}

/* Animation de révélation au scroll */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Délais pour chaque paragraphe */
.delay-0 { transition-delay: 0s; }
.delay-100 { transition-delay: 0.1s; }
.delay-200 { transition-delay: 0.2s; }
.delay-300 { transition-delay: 0.3s; }
.delay-400 { transition-delay: 0.4s; }
.delay-500 { transition-delay: 0.5s; }
.delay-600 { transition-delay: 0.6s; }
.delay-700 { transition-delay: 0.7s; }
.delay-800 { transition-delay: 0.8s; }
.delay-900 { transition-delay: 0.9s; }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    box-shadow: 0 25px 50px -12px rgba(11, 84, 51, 0.25);
  }
  50% {
    transform: translateY(-10px) rotate(1deg);
    box-shadow: 0 30px 60px -12px rgba(11, 84, 51, 0.35);
  }
}
</style>