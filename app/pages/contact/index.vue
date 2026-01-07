<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="relative w-full max-w-4xl flex flex-col md:flex-row items-center">
      
      <div class="z-10 w-full md:w-2/5 bg-gradient-to-br from-[#114b3d] via-[#0a3241] to-[#061c4d] p-10 rounded-lg shadow-xl text-white">
        <h2 class="text-3xl font-bold mb-8">Nos informations</h2>
        
        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <UIcon name="i-heroicons-map-pin" class="w-6 h-6 mt-1" />
            <p class="text-sm">01 BP 302 COTONOU<br />- ROUTE DE L'AEROPORT</p>
          </div>
          
          <div class="flex items-center gap-4">
            <UIcon name="i-heroicons-envelope" class="w-6 h-6" />
            <p class="text-sm">secretariat.dgml@finances.bj</p>
          </div>
          
          <div class="flex items-center gap-4">
            <UIcon name="i-heroicons-phone" class="w-6 h-6" />
            <p class="text-sm">+229 01 40 740 740</p>
          </div>

          <div class="flex items-center gap-4">
            <UIcon name="i-heroicons-globe-alt" class="w-6 h-6" />
            <NuxtLink to="" class="text-sm">dgml.bj</NuxtLink>
          </div>
        </div>
      </div>

      <div class="w-full md:w-3/5 bg-white p-10 md:pl-20 py-16 -mt-6 md:-mt-0 md:-ml-10 rounded-lg shadow-lg">
        <h3 class="text-2xl font-bold text-slate-800 mb-2">Contactez-nous</h3>
        <p class="text-slate-400 text-sm mb-8"></p>

        <form @submit.prevent class="space-y-6">
          <UInput 
            placeholder="Votre Nom et Prénoms" 
            variant="none"
            class="bg-slate-50 rounded-md border-none w-full"
            size="lg"
          />
          
          <UInput 
            type="email" 
            placeholder="Votre Email" 
            variant="none"
            class="bg-slate-50 rounded-md border-none w-full"
            size="lg"
          />

          <UInput 
            type="text" 
            placeholder="Sujet" 
            variant="none"
            class="bg-slate-50 rounded-md border-none w-full"
            size="lg"
          />
          
          <UTextarea 
            placeholder="Mettez votre message ici..." 
            variant="none"
            :rows="5"
            class="bg-slate-50 rounded-md border-none w-full"
          />

          <div class="pt-4 flex justify-end">
            <UButton 
              label="SEND" 
              size="xl"
              class="bg-gradient-to-r from-[#114b3d] to-[#0a3241] hover:opacity-90 transition-opacity border-none font-bold tracking-widest px-10"
              :ui="{ rounded: 'rounded-full' }"
            />
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>

const form = ref({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const submitForm = async () => {
  // Réinitialiser les messages
  successMessage.value = ''
  errorMessage.value = ''
  
  // Validation simple
  if (!form.value.name || !form.value.email || !form.value.message) {
    errorMessage.value = 'Veuillez remplir tous les champs'
    return
  }
  
  loading.value = true
  
  try {
    // Remplacez cette URL par l'URL de votre API WordPress
    const response = await fetch('https://dgml.bj/wp-json/contact-form-7/v1/contact-forms/YOUR_FORM_ID/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: new FormData(Object.entries({
        'your-name': form.value.name,
        'your-email': form.value.email,
        'your-message': form.value.message
      }).reduce((fd, [key, value]) => {
        fd.append(key, value)
        return fd
      }, new FormData()))
    })
    
    const data = await response.json()
    
    if (data.status === 'mail_sent') {
      successMessage.value = 'Message envoyé avec succès!'
      // Réinitialiser le formulaire
      form.value = {
        name: '',
        email: '',
        message: ''
      }
    } else {
      errorMessage.value = data.message || 'Une erreur est survenue'
    }
  } catch (error) {
    errorMessage.value = 'Erreur lors de l\'envoi du message'
    console.error('Erreur:', error)
  } finally {
    loading.value = false
  }
}
</script>