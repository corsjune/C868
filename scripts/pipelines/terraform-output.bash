    #!/bin/bash 
    mypath=$1
    output=$(jq 'to_entries|map([.key] + [.value.value] + [.value.sensitive])' ${mypath}output.json | jq -c '.[]')
    for row in $(echo "${output}" ); do

        variable=$(echo "${row}" | jq -r '.[0]')
        value=$(echo "${row}" | jq -r '.[1]')
        isSecret=$(echo "${row}" | jq -r '.[2]')

        echo "Creating variable ${variable}"
        echo "##vso[task.setvariable variable=${variable};isSecret=${isSecret};isoutput=true]${value}"
        
    done
