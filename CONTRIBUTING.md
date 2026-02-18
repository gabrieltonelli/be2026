# Contributing to Be

Thank you for your interest in contributing to Be!

## 🌍 Internationalization (i18n)

**CRITICAL RULE**: All user-facing text MUST be in translation files. Never hard code strings.

### Adding Translations

1. Add your text to the appropriate file in `i18n/locales/es/`
2. Add the English translation in `i18n/locales/en/`
3. Use the translation in code:
   ```tsx
   const { t } = useTranslation('namespace');
   return <Text>{t('key')}</Text>;
   ```

4. Run verification: `npm run i18n:check`

## 📝 Code Style

- **TypeScript** for all code
- **ESLint** + **Prettier** for formatting
- **Conventional Commits** for commit messages

## 🔀 Git Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📚 Documentation

When adding features, update relevant docs in `/docs`:
- `ARCHITECTURE.md` for architectural changes
- `DATA_MODEL.md` for database changes
- `INTERNATIONALIZATION.md` for i18n updates

## 🧪 Testing

- Write tests for new features
- Ensure existing tests pass: `npm test`
- Maintain >80% code coverage

## 📋 Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] All user-facing text uses i18n
- [ ] TypeScript types are defined
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Commit messages follow conventions
