#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SUCCESS=true
export NODE_ENV=test

for f in $DIR/tests/test-*.js ; do
    if [ -f "$f" ] ; then
        BASENAME=$(basename $f)
        printf "Executing $BASENAME... "
        OUTPUT=$(`npm bin`/babel-istanbul cover --dir "./coverage/$BASENAME" "$f" 2>&1)

        if [ $? -ne 0 ] ; then
            echo -e "\xC3\x97"
            SUCCESS=false

            echo
            echo "$OUTPUT"
            echo
        else
            echo -e "\xE2\x9C\x93"
        fi
    fi
done

$SUCCESS || exit 1
