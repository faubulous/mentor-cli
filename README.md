# Mentor CLI

A collection of command-line utilities which are intended to support CI workflows for projects that use RDF technologies.

## Features

- Generate TypeScript modules from RDF vocabularies.
- Supports glob patterns for batch processing.
- Optional generation of `index.ts` and `src.ts` files for easy imports.
- CLI interface for easy integration into build pipelines.

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/mentor-cli.git
cd mentor-cli
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Build the Project

```sh
npm run build
```

This will compile the TypeScript source code into the `out/` directory.

## Usage

You can use the generator directly with `npx` (no global install required):

### Generate from a Directory (Glob Pattern)

```sh
npx mentor-cli generate --input "some/dir/*.ttl" --output-extension .ts --create-index-ts --create-src-ts
```

- `--input` - Glob pattern for RDF files to process (quote the pattern to prevent shell expansion).
- `--output-extension` - Output file extension (default: `.ts`).
- `--create-index-ts` - Also generate an `index.ts` file.
- `--create-src-ts` - Also generate a `src.ts` file.

### Generate from a Single File

```sh
npx mentor-cli generate --input "some/dir/test.ttl" --output-extension .ts
```

## Development & Testing

- **Run tests:**  
  ```sh
  npm test
  ```

- **Debugging:**  
  See `.vscode/launch.json` for recommended VS Code debug configuration.

## License
GPL-3.0

## Contributing
Pull requests and issues are welcome!