#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SUCCESS=true

for f in $DIR/tests/*.js ; do
    if [ -f "$f" ] ; then
        node "$f"

        if [ $? -ne 0 ] ; then
            SUCCESS=false
        fi
    fi
done

$SUCCESS || exit 1
