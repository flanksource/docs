# Glossary 
This glossary is meant to be an exhaustive, consistent list of the terms and fields used with Flanksource tools. This terminology covers both tool-specific terms as well as more general ones that offer helpful context.
??? Canary-checker
    ## **Common Fields** 
    This section outlines common fields for the different checks.
    ### Authentication (`authentication`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |

    ### Labels (`labels`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |

    ### Template
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | jsonPath | Specify path to JSON element for use in template | string |  |
    | template | Specify go template for use | string |  |
    | expr | Specify expression for use in template  | string |  |
    | javascript | Specify javascript syntax for template | string |  |
    
    ---

    ## **Checks**    
    This section outlines in detail the different fields associated with their respective checks.
    ### AWSConfig (`awsConfig`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | `aggregatorName` |
    | [`awsConnection`](#awsconnection-awsconnection) |
    | `description` |
    | `display` |
    | `icon` |
    | `labels` |
    | `name` |
    | `query` |
    | `test` |
    | `transform` |

    ### AWSConnection (`awsConnection`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | `accessKey` |
    | `endpoint` |
    | `objectPath` |
    | `region` |
    | `secretKey` |
    | `skipTLSVerify` |
    | `usePathStyle` |

    ---
    ### Cloudwatch (`cloudwatch`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | `accessKey` |
    | `description` |
    | `display` |
    | `endpoint` |
    | [`filter`](#cloudwatch-filter-filter) |
    | `icon` |
    | `labels` |
    | `name` |
    | `objectPath` |
    | `region` |
    | `secretKey` |
    | `skipTLSVerify` |
    | `test` |
    | `transform` |
    | `usePathStyle` |

    ### Cloudwatch Filter (`filter`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | `actionPrefix` |
    | `alarmPrefix` |
    | `alarms` |
    | `state` |

    ---
    ### ConfigDB (`configDB`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | [`authentication`](#authentication) |
    | `description` |
    | `display` |
    | `host` |
    | `icon` |
    | `labels` |
    | `name` |
    | `query` |
    | `test` |
    | `transform` |













    ## `s3`
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | `accessKey` |
    | `bucket` |
    | `description` |
    | `icon` |
    | `labels` |
    | `name` |
    | `objectPath` |
    | `secretKey` |
    | `skipTLSVerify` |

    ### `bucket`
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | `endpoint` |
    | `name` |
    | `region` |

    ---


      
??? Config-db

??? Incident-commander
