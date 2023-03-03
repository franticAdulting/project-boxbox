## Adding eslint + prettier [Source](https://blog.logrocket.com/linting-typescript-eslint-prettier/)

- `yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier`
- Update `.eslintrc`:

```
{
"parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  "env": {
    "browser": true,
    "es2021": true
  },
}
```

- Create `.eslintignore`:

```
/node_modules
```

- Install VSCode Extension: ESLint
- Install VSCode Extension: Prettier
- Add to `Preferences: Open Settings`:

```
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
```

## Resources

https://12factor.net/
