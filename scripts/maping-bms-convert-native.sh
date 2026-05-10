#!/usr/bin/env bash
set -euo pipefail
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <input.bms> <output.mis>" >&2
  exit 64
fi
script_dir="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
php_bin="${MAPING_PHP_BIN:-php}"
exec "$php_bin" "$script_dir/maping-bms-to-mis-native.php" "$1" "$2"
