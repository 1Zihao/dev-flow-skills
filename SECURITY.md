# Security Policy

## Supported versions

The latest release on `main` is supported.

## Reporting a vulnerability

Please report security issues privately rather than opening a public issue.

Use GitHub's private vulnerability reporting if it is enabled for the repository, or contact the repository owner directly.

## Security expectations

- The installer must not overwrite unmanaged or locally modified files unless `--force` is explicitly passed.
- The CLI must not require secrets for normal install, update, doctor, or uninstall operations.
- Documentation must not ask users to paste tokens into shell history unless there is no safer alternative.
- Release automation must use GitHub or npm secrets rather than committed credentials.
