# Weather CLI

A simple command-line tool for checking current weather conditions and forecasts directly from your terminal.

## Installation

### Prerequisites

- Ensure that you have [Homebrew](https://brew.sh) installed on your system.

### Tapping and Installing

To install `weather-cli`, add the custom Homebrew tap and install the CLI tool:

```bash
brew tap GloryWong/homebrew-tap
brew install weather-cli
```

## Usage

After installation, the CLI tool will be available globally as the command weather-cli.

### Display Help

For a list of available commands and options, run:

```bash
weather-cli --help
```

### Get Current Weather

To check the current weather(the location is based on the current ip), run:

```bash
weather-cli
```

### Get Current Weather for a specific location

To check the current weather for a specific location, run:

```bash
weather-cli <latitude> <longitude>
```

### Get Current Location

To check current location (based on the current ip), run:

```bash
weather-cli --location
```

## Updating

To upgrade weather-cli to the latest version when a new release is available, simply run:

```bash
brew upgrade weather-cli
```

## Troubleshooting

* Installation issues:
  Ensure that you have correctly added the custom tap using:
  ```bash
  brew tap GloryWong/homebrew-tap
  ```

* General help
  Run:
  ```bash
  weather-cli --help
  ```
  to view usage instructions and available options.

## Contributing

Contributions are welcome! If you have ideas, bug fixes, or improvements, please Open an issue or submit a pull request on the [GitHub repository](https://github.com/GloryWong/weather-cli).

## License

This project is licensed under the MIT License. See the LICENSE file for more details.