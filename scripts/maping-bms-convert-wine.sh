#!/usr/bin/env bash

set -euo pipefail

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <input.bms> <output.mis>" >&2
  exit 64
fi

input_path="$1"
output_path="$2"
script_dir="$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd)"
project_root="$(CDPATH='' cd -- "$script_dir/.." && pwd)"
converter_path="${MAPING_BMS_WINE_EXE:-$project_root/resources/bhdbms2mis205b114/BHDBMS2MIS.exe}"
wine_bin="${MAPING_WINE_BIN:-wine}"
work_dir="${MAPING_BMS_WINE_WORKDIR:-$(dirname -- "$output_path")}"
log_path="${MAPING_BMS_WINE_LOG:-$work_dir/bms-convert.log}"

if [ ! -f "$input_path" ]; then
  echo "Input BMS file not found: $input_path" >&2
  exit 66
fi

if [ ! -f "$converter_path" ]; then
  echo "Wine converter executable not found: $converter_path" >&2
  exit 66
fi

if ! command -v "$wine_bin" >/dev/null 2>&1; then
  echo "Wine is not installed or is not in PATH for this PHP user: $wine_bin" >&2
  echo "Install Wine, set MAPING_WINE_BIN to the full wine binary path, or configure MAPING_BMS_NATIVE_COMMAND to use a native converter." >&2
  exit 127
fi

mkdir -p -- "$(dirname -- "$output_path")"
mkdir -p -- "$work_dir"

rm -f -- "$output_path"

# This wrapper assumes the converter supports a non-interactive CLI of:
#   BHDBMS2MIS.exe <input.bms> <output.mis>
# If your deployment needs GUI automation instead, replace the command block below
# with your Wine automation tool and keep the same input/output contract.
set +e
"$wine_bin" "$converter_path" "$input_path" "$output_path" >"$log_path" 2>&1
exit_code=$?
set -e

if [ "$exit_code" -ne 0 ]; then
  cat "$log_path" >&2 || true
  echo "Wine converter exited with code $exit_code" >&2
  exit "$exit_code"
fi

if [ ! -s "$output_path" ]; then
  cat "$log_path" >&2 || true
  echo "Wine converter did not produce an output MIS file" >&2
  exit 65
fi

printf 'Converted %s -> %s\n' "$input_path" "$output_path"