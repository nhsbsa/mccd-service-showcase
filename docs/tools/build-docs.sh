SOURCE_DIR=${1}
PROJECT_NAME=${2}
TARGET_DIR=$(pwd)/${3:-build}
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

mkdir ${TARGET_DIR}

output="${TARGET_DIR}/${PROJECT_NAME}"
dir="$(pwd)/${SOURCE_DIR}"

cd ${dir}
input=$(find . -name '*.md' -and ! -name '*.md.exclude' | sort -V)
pandoc "${@:4}" --verbose  -s $input  -o "$output"
