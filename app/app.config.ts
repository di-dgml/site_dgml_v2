export default defineAppConfig({
  ui: {
    // Le 'emerald' se marie mieux avec le bleu nuit que le 'green' basique
    primary: 'emerald',
    neutral: 'slate',

    card: {
      // Effet de vitre (Glassmorphism) pour les cartes sur fond dégradé
      base: 'overflow-hidden transition-all duration-300',
      background: 'bg-white/90 dark:bg-gray-900/80 backdrop-blur-md',
      ring: 'ring-1 ring-gray-200 dark:ring-emerald-500/20',
      shadow: 'shadow-xl hover:shadow-2xl',
      body: {
        base: 'text-gray-800 dark:text-gray-100'
      }
    },

    // Configuration globale pour les boutons et badges pour qu'ils ressortent
    button: {
      default: {
        color: 'primary'
      }
    },
    badge: {
      rounded: 'rounded-full',
      variant: 'solid'
    }
  }
})
