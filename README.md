# LinkUp - Secure Private Messaging Platform

LinkUp is a secure and private messaging platform that helps you stay connected with your friends and family. End-to-end encrypted, fast, and easy to use.

[![LinkUp Preview](https://linkup-chat-opal.vercel.app/og-image.png)](https://linkup-chat-opal.vercel.app/)

## 🚀 Features

- 🔒 End-to-end encrypted messaging
- 💬 Real-time messaging with instant message delivery
- 🎨 Modern UI with Tailwind CSS and Nuxt UI components
- 🔐 Secure authentication and user management
- 📱 Responsive design that works on all devices
- 🎭 Dark/Light mode support
- 🔔 Real-time notifications
- 📎 File sharing capabilities
- 🔍 Message search functionality
- 👥 Group chat support
- 🎨 Customizable user profiles
- 🔄 Message status indicators (sent, delivered, read)
- 🎬 Lottie animations for enhanced user experience

## 🛠️ Tech Stack

- [Nuxt 3](https://nuxt.com/) - The Vue Framework
- [Vue 3](https://vuejs.org/) - Progressive JavaScript Framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Nuxt UI](https://ui.nuxt.com/) - UI components for Nuxt
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Pinia](https://pinia.vuejs.org/) - State management
- [FormKit Auto Animate](https://formkit.com/plugins/auto-animate) - Smooth animations
- [Lottie](https://lottiefiles.com/) - Animation support

## 📦 Prerequisites

- Node.js (v18.x or later)
- pnpm (v10.8.0 or later)
- Supabase account
- Git

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/linkup.git
cd linkup
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# App Configuration
APP_URL=http://localhost:3000
NODE_ENV=development
```

4. Set up Supabase:

   - Create a new project in Supabase
   - Enable Authentication and set up your preferred auth providers
   - Create the necessary database tables (see `supabase/migrations` folder)
   - Copy your project URL and anon key to the `.env` file

5. Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Build

Build the application for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## 🧪 Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm generate` - Generate static site
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## 📁 Project Structure

```
├── assets/         # Static assets (images, fonts, etc.)
├── components/     # Vue components
│   ├── chat/      # Chat-related components
│   ├── common/    # Shared components
│   └── ui/        # UI components
├── composables/    # Vue composables
├── config/         # Configuration files
├── layouts/        # Page layouts
├── middleware/     # Route middleware
├── pages/          # Application pages
├── plugins/        # Vue plugins
├── public/         # Public static files
├── server/         # Server-side code
├── stores/         # Pinia stores
├── types/          # TypeScript types
└── utils/          # Utility functions
```

## 🔧 Troubleshooting

### Common Issues

1. **Authentication Issues**

   - Ensure your Supabase credentials are correct in `.env`
   - Check if the auth providers are properly configured in Supabase

2. **Real-time Updates Not Working**

   - Verify your Supabase real-time subscriptions
   - Check network connectivity
   - Ensure you're using the correct channel names

3. **Build Errors**
   - Clear the `.nuxt` and `.output` directories
   - Run `pnpm install` to ensure all dependencies are up to date
   - Check for TypeScript errors

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Nuxt Team](https://nuxt.com/team) for the amazing framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- All contributors who have helped shape this project

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the [troubleshooting guide](#troubleshooting)
2. Search through [existing issues](https://github.com/yourusername/linkup/issues)
3. Create a new issue if needed

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!
