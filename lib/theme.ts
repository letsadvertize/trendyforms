// Theme configuration for the medical forms application
// This ensures consistent styling across all pages and components

export const appTheme = {
  // Main app branding
  branding: {
    name: "Medical Forms Portal",
    tagline: "Hospital In Your Home - Comprehensive Healthcare Solutions",
    contact: {
      phone: "📞 1-844-MY-HIYH",
      email: "✉️ info@hiyh.us"
    }
  },

  // Color schemes for different specialties
  specialties: {
    immunodeficiency: {
      primary: "blue",
      gradient: "from-blue-50 to-indigo-100",
      header: "from-blue-600 to-indigo-600",
      accent: "blue-600",
      light: "blue-50",
      text: "blue-800",
      border: "blue-600"
    },
    neurodegenerative: {
      primary: "purple",
      gradient: "from-purple-50 to-pink-100",
      header: "from-purple-600 to-pink-600",
      accent: "purple-600",
      light: "purple-50",
      text: "purple-800",
      border: "purple-600"
    },
    general: {
      primary: "slate",
      gradient: "from-slate-50 to-gray-100",
      header: "from-slate-600 to-gray-600",
      accent: "slate-600",
      light: "slate-50",
      text: "slate-800",
      border: "slate-600"
    }
  },

  // Common layout classes
  layout: {
    pageContainer: "min-h-screen py-8",
    contentContainer: "container mx-auto px-4",
    formCard: "max-w-4xl mx-auto bg-white shadow-xl",
    successCard: "max-w-2xl mx-auto shadow-xl text-center",
    backButton: "mb-6"
  },

  // Form header styling
  formHeader: {
    base: "text-white py-6 shadow-lg",
    background: "bg-gradient-to-r from-slate-700 to-slate-800",
    content: "flex justify-between items-center",
    logoSection: "flex items-center space-x-4",
    logo: "h-12 w-auto brightness-0 invert",
    title: "text-xl font-bold text-white",
    subtitle: "text-sm text-slate-100",
    contact: "text-sm text-slate-200",
    buttonGroup: "flex gap-2",
    actionButton: "bg-white/20 hover:bg-white/30 text-white border-white/30"
  },

  // Hospital info bar styling
  hospitalInfo: {
    base: "p-4 rounded-lg border-l-4 mb-8",
    content: "flex justify-between items-center text-sm",
    leftSection: "font-semibold",
    rightSection: "text-right font-medium"
  },

  // Form section styling
  formSection: {
    container: "space-y-6",
    title: "text-lg font-semibold border-b pb-2",
    grid: "grid grid-cols-1 md:grid-cols-2 gap-6",
    gridThree: "grid grid-cols-1 md:grid-cols-3 gap-4"
  },

  // Submit button styling
  submitButton: {
    container: "flex justify-center pt-6",
    button: "px-8 py-3 text-lg font-semibold shadow-lg",
    loading: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
  },

  // Success state styling
  successState: {
    icon: "h-16 w-16 text-green-500 mx-auto mb-4",
    title: "text-2xl font-bold text-gray-900 mb-2",
    description: "text-gray-600 mb-6",
    details: "text-sm text-gray-500"
  },

  // Navigation styling
  navigation: {
    cardGrid: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
    cardGridTwo: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto",
    card: "hover:shadow-lg transition-shadow duration-300",
    cardHeader: "pb-4",
    iconContainer: "p-2 rounded-lg",
    iconLarge: "p-3 rounded-full w-fit mx-auto mb-4",
    title: "text-lg leading-tight",
    titleLarge: "text-2xl text-gray-900",
    description: "mt-2 text-gray-600",
    button: "w-full"
  }
}

// Helper function to get specialty theme
export const getSpecialtyTheme = (specialty: keyof typeof appTheme.specialties) => {
  return appTheme.specialties[specialty] || appTheme.specialties.general
}

// Helper function to build class names with specialty colors
export const buildSpecialtyClasses = (
  specialty: keyof typeof appTheme.specialties,
  baseClasses: string,
  colorType: 'primary' | 'accent' | 'light' | 'text' | 'border' | 'gradient' | 'header' = 'primary'
) => {
  const theme = getSpecialtyTheme(specialty)
  return `${baseClasses} ${theme[colorType]}`
}
