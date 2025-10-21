# Contributing to Learningo 🎉

Thank you for your interest in contributing to Learningo! We're excited to have you here, especially during Hacktoberfest! 🎃

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Coding Standards](#coding-standards)
- [Hacktoberfest Guidelines](#hacktoberfest-guidelines)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

## 🤝 How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version, etc.)

### Suggesting Enhancements 💡

Enhancement suggestions are welcome! Please provide:

- **Clear use case** for the feature
- **Detailed description** of the proposed functionality
- **Why this enhancement would be useful** to most users
- **Possible implementation approach** (optional)

### Areas for Contribution

- **UI/UX improvements**: Better design, animations, accessibility
- **New features**: Additional quiz types, study modes, analytics
- **Bug fixes**: Fix existing issues
- **Documentation**: Improve README, add JSDoc comments
- **Performance**: Optimize loading times, reduce bundle size
- **Testing**: Add unit tests, integration tests
- **Accessibility**: Improve screen reader support, keyboard navigation

## 🚀 Getting Started

1. **Fork the repository** to your GitHub account

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/learningo.git
   cd learningo
   ```

3. **Add the upstream repository**:
   ```bash
   git remote add upstream https://github.com/anay-208/learningo.git
   ```

4. **Install dependencies**:
   ```bash
   pnpm install
   ```

5. **Set up environment variables** (see README.md for details):
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

6. **Set up the database**:
   ```bash
   pnpm db:push
   ```

7. **Run the development server**:
   ```bash
   pnpm dev
   ```

## 💻 Development Workflow

1. **Create a new branch** for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes** following our [coding standards](#coding-standards)

3. **Test your changes** thoroughly:
   ```bash
   pnpm dev
   # Test manually in the browser
   ```

4. **Lint your code**:
   ```bash
   pnpm lint
   ```

5. **Build to ensure no errors**:
   ```bash
   pnpm build
   ```

6. **Commit your changes** with a clear message:
   ```bash
   git add .
   git commit -m "feat: add new quiz timer feature"
   ```
   
   Use conventional commits:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request** from your fork to the main repository

## 📝 Pull Request Guidelines

### Before Submitting

- ✅ Test your changes thoroughly
- ✅ Ensure the code builds without errors (`pnpm build`)
- ✅ Follow the existing code style
- ✅ Update documentation if needed
- ✅ Add comments for complex logic
- ✅ Check that your branch is up to date with main

### PR Description Should Include

- **What** changes you made
- **Why** you made these changes
- **How** to test the changes
- **Screenshots/GIFs** for UI changes
- **Related issues** (e.g., "Fixes #123")

### Example PR Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Changes Made
- Added X feature
- Fixed Y bug
- Improved Z performance

## How to Test
1. Go to '...'
2. Click on '...'
3. See the change

## Screenshots (if applicable)
[Add screenshots here]

## Related Issues
Fixes #(issue number)
```

## 🎨 Coding Standards

### TypeScript/React

- Use **TypeScript** for type safety
- Follow **React best practices**
- Use **functional components** with hooks
- Prefer **named exports** over default exports for components
- Use **meaningful variable and function names**
- Keep components **small and focused**

### Code Style

```typescript
// ✅ Good
interface QuestionProps {
  question: QuestionType;
  onAnswer: (answer: number) => void;
}

export function QuestionCard({ question, onAnswer }: QuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  
  const handleClick = (option: number) => {
    setSelected(option);
    onAnswer(option);
  };
  
  return (
    // JSX here
  );
}

// ❌ Avoid
export default function q(props: any) {
  // unclear code
}
```

### File Organization

- Components go in `/src/components`
- Pages go in `/src/app`
- Server actions in `/src/actions`
- Utilities in `/src/lib`
- Database schema in `/src/db`

### Styling

- Use **Tailwind CSS** utility classes
- Follow existing color scheme (purple/pink theme)
- Ensure **dark mode support**
- Make components **responsive**
- Consider **accessibility** (ARIA labels, semantic HTML)

## 🎃 Hacktoberfest Guidelines

### Valid Contributions

- ✅ Bug fixes
- ✅ New features
- ✅ Documentation improvements
- ✅ Code refactoring
- ✅ Performance improvements
- ✅ UI/UX enhancements

### Invalid Contributions (will be marked as spam)

- ❌ Minor typo fixes in comments
- ❌ Whitespace changes
- ❌ Adding/removing blank lines
- ❌ Automated/bot PRs
- ❌ Duplicate PRs

### Hacktoberfest Labels

Look for issues with these labels:
- `hacktoberfest` - Issues suitable for Hacktoberfest
- `good first issue` - Great for newcomers
- `help wanted` - We need help with these!

## 🤔 Questions?

- **General questions**: Open a GitHub Discussion
- **Bug reports**: Open an issue with the bug template
- **Security issues**: Email me@anayparaswani.dev
- **Feature requests**: Open an issue with the feature template

## 📞 Contact

- **GitHub**: [@anay-208](https://github.com/anay-208)
- **Email**: me@anayparaswani.dev
- **Project**: [Learningo](https://github.com/anay-208/learningo)

## 🙏 Thank You!

Every contribution, no matter how small, is valuable and appreciated. Thank you for helping make Learningo better for students everywhere! 

Happy coding! 🚀

---

**Note**: By contributing to Learningo, you agree that your contributions will be licensed under the same license as the project.
