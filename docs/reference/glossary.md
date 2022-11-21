# Glossary 
This glossary is meant to be an exhaustive, consistent list of the terms and fields used with Flanksource tools. This terminology covers both tool-specific terms as well as more general ones that offer helpful context.
??? Canary-checker
    ## **Sub Fields** 
    This section outlines the subsequent fields that follow for the different checks.
    ### Authentication (`authentication`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |

    ### GCP (`gcp`)

    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | project | Specify GCP project | string | Yes |
    | instance | Specify GCP instance | string | Yes |
    | gcpConnection | Set up gcpConnection with GCP `endpoint` and `credentials` |  |


    ### Labels (`labels`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |

    ### Bucket (`bucket`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | `endpoint` |
    | `name` |
    | `region` |


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

    ## Containerd (`containerd`)

    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | auth | Username and password value, configMapKeyRef or SecretKeyRef for registry | [Authentication](#authentication) |  |
    | description | Description for the check | string |  |
    | expectedDigest | Expected digest of the pulled image | string | Yes |
    | expectedSize | Expected size of the pulled image | int64 | Yes |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | **image** | Full path to image, including registry | string | Yes |
    | labels | |
    | name | Name of the check | string |  |

    ## ContainerdPush (`containerdPush`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | description | Description for the check | string |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | **image** | Full path to image, including registry | string | Yes |
    | name | Name of the check | string |  |
    | **password** | Password to access Containerd | string | Yes |
    | **username** | Username to access Containerd | string | Yes |

    ## Databasebackup (`databaseBackup`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | description | Description for the check | string |  |
    | display | Template to display server response in text (overrides default bar format for UI) | [Template](#template) |  |
    | gcp | Connect to GCP project and instance | *[GCPDatabase](#gcpdatabase) |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | labels | Labels for the check | Labels |  |
    | maxAge | Max age for backup allowed, eg. 5h30m | Duration |  |
    | **name** | Name of the check | string | Yes |
    | test | Template to test the result against | [Template](#template) |  |
    | transform | Template to transform results to | [Template](#template) |  |

    ## DNS (`dns`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | description | Description for the check | string |  |
    | exactreply | Expected exact match result(s) | \[\]string |  |
    | **server** | Address of DNS server to query | string | Yes |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | minrecords | Minimum records | int |  |
    | name | Name of the check | string |  |
    | port | Port to query DNS server on | int | Yes |
    | query | Domain name to lookup | string |  |
    | querytype | Record type to query | string | Yes |
    | thresholdMillis | Threshold response time from DNS server	 | int | Yes |
    | timeout | Maximum timeout for DNS query | int | Yes |

    ## Docker (`docker`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | auth | Username and password value, configMapKeyRef or SecretKeyRef for registry | [Authentication](#authentication) |  |
    | description | Description for the check | string |  |
    | expectedDigest | Expected digest of the pulled image | string | Yes |
    | expectedSize | Expected size of the pulled image | int64 | Yes |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | **image** | Full path to image, including registry | string | Yes |
    | name | Name of the check | string |  |

    ## DockerPush (`dockerPush`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | auth | Username and password value, configMapKeyRef or SecretKeyRef for Dockerhub | *[Authentication](#authentication) |  |
    | description | Description for the check | string |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | **image** | Full path to image, including registry | string | Yes |
    | name | Name of the check | string |  |

    ## EC2 (`ec2`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | **accessKey** | AWS access Key to access EC2| [kommons.EnvVar](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes |
    | ami | Master image to create EC2 instance from | string |  |
    | canaryRef | Reference Canary object | \[\][v1.LocalObjectReference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#localobjectreference-v1-core) |  |
    | description | Description for the check | string |  |
    | endpoint | EC2 instance endpoint | string |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | keepAlive | Toggle keepalive with `true` or `false` | bool |  |
    | name | Name of the check | string |  |
    | region | EC2 instance region | string |  |
    | **secretKey** | AWS secret Key to access EC2 instance | [kommons.EnvVar](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes |
    | securityGroup | Security group to attach to EC2 | string |  |
    | skipTLSVerify | Skip TLS verify when connecting to aws | bool |  |
    | timeOut | Set keep-alive timeout | int |  |
    | userData | Configure EC2 instance with user data | string |  |
    | waitTime | Set wait-time for EC2 instance launch | int |  |

    ## ElasticSearch (`elasticsearch`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | auth | username and password value, configMapKeyRef or SecretKeyRef for elasticsearch server | *[Authentication](#authentication) |  |
    | description | Description for the check | string |  |
    | display | Template to display the result in  | [Template](#template) |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | **index** | Index against which query should be ran | string | Yes |
    | labels | Labels for the check | Labels |  |
    | **name** | Name of the check | string | Yes |
    | **query** | Query that needs to be executed on the server | string | Yes |
    | **results** | Number of expected hits | int | Yes |
    | test | Template to test the result against | [Template](#template) |  |
    | transform | Template to transform results to | [Template](#template) |  |
    | **url** | host:port address | string | Yes |

    ## Exec (`exec`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | description | Description for the check | string |  |
    | display | Template to display server response in text (overrides default bar format for UI) | [Template](#template) |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | labels | Labels for the check | Labels |  |
    | **name** | Name of the check | string | Yes |
    | **script** | Script can be a inline script or a path to a script that needs to be executed. On windows executed via powershell and in darwin and linux executed using bash. | *string | Yes |
    | test | Template to test the result | [Template](#template) |  |
    | transform | Template to transform results by excluding or including certain fields in result | [Template](#template) |  |

    ## Folder (`folder`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | availableSize |
    | [awsConnection](#awsconnection) |
    | description |
    | display |
    | filter |
    | [gcpConnection](#gcpconnection) |
    | icon |
    | labels |
    | maxAge |
    | maxCount |
    | maxSize |
    | minAge |
    | minCount |
    | minSize |
    | name |
    | path |
    | [sftpConnection](#sftpconnection) |
    | [smbConnection](#smbconnection) |
    | test |
    | totalSize |
    | transform |

    ## Github (`github`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | description |
    | display |
    | [githubToken](#githubtoken) |
    | icon |
    | labels |
    | name |
    | query |
    | test |
    | transform |

    ## Helm (`helm`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | auth | Username and password value, configMapKeyRef or SecretKeyRef for Helm repository | *[Authentication](#authentication) |  |
    | cafile | Verify certificates of HTTPS-enabled servers in case of self-signed certificates | string |  |
    | **chartmuseum** | Chartmuseum URL | string | Yes |
    | description | Description for the check | string |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | name | Name of the check | string |  |
    | project | Specify Helm project | string |  |

    ## HTTP (`http`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | authentication | Credentials for authentication headers | *[Authentication](#authentication) |  |
    | body | Request Body Contents | string |  |
    | description | Description for the check | string |  |
    | display | template to display server response in text (overrides default bar format for UI) | [Template](#template) |  |
    | **endpoint** | HTTP endpoint to check.  Mutually exclusive with Namespace | string | Yes |
    | headers | Header fields to be used in the query | \[\][kommons.EnvVar](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | maxSSLExpiry | Maximum number of days until the SSL Certificate expires. | int |  |
    | method | Method to use - defaults to GET | string |  |
    | name | Name of the check | string |  |
    | namespace | Namespace to crawl for TLS endpoints.  Mutually exclusive with Endpoint | string |  |
    | ntlm | NTLM when set to true will do authentication using NTLM v1 protocol | bool |  |
    | ntlmv2 | NTLM when set to true will do authentication using NTLM v2 protocol | bool |  |
    | responseCodes | Expected response codes for the HTTP Request. | \[\]int |  |
    | responseContent | Exact response content expected to be returned by the endpoint. | string |  |
    | responseJSONContent | Path and value to of expect JSON response by the endpoint | [JSONCheck](#jsoncheck) |  |
    | test |  | [Template](#template) |  |
    | thresholdMillis | Maximum duration in milliseconds for the HTTP request. It will fail the check if it takes longer. | int |  
    
    ## ICMP (`icmp`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | description | Description for the check | string |  |
    | **endpoint** | Address to query using ICMP | string | Yes |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | name | Name of the check | string |  |
    | packetCount | Total number of packets to send per check | int |  |
    | packetLossThreshold | Percent of total packets that are allowed to be lost | int64 |  |
    | thresholdMillis | Expected response time threshold in ms | int64 |  |

    ## JMeter (`jmeter`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | description | Description for the check | string |  |
    | host | Host is the server against which test plan needs to be executed | string |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | **jmx** | Jmx defines the ConfigMap or Secret reference to get the JMX test plan | [kommons.EnvVar](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes |
    | name | Name of the check | string |  |
    | port | Port on which the server is running | int32 |  |
    | properties | Properties defines the local Jmeter properties | \[\]string |  |
    | responseDuration | ResponseDuration under which the all the test should pass | string |  |
    | systemProperties | SystemProperties defines the java system property | \[\]string |  |

    ## JUnit (`junit`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | description | Description for the check | string |  |
    | display | Template to display the result in | [Template](#template) |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | name | Name of the check | string |  |
    | **spec** | Pod specification | [v1.PodSpec](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#podspec-v1-core) | Yes |
    | test | Template to test the result against | [Template](#template) |  |
    | **testResults** | Directory where the results will be published | string | Yes |
    | timeout | Timeout in minutes to wait for specified container to finish its job. Defaults to 5 minutes | int |  |

    ## Kubernetes (`kubernetes`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | description | Description for the check | string |  |
    | display | Template to display query results in text (overrides default bar format for UI) | [Template](#template) |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | ignore | Ignore the specified resources from the fetched resources. Can be a glob pattern. | \[\]string |  |
    | **kind** | Specifies the kind of Kubernetes object for interaction | string | Yes |
    | labels | Labels for the check | Labels |  |
    | **name** | Name of the check | string | Yes |
    | namespace | Specifies namespce for Kubernetes object | [ResourceSelector](#resourceselector) |  |
    | ready | Boolean value of true or false to query and display resources based on availability | *bool |  |
    | resource | Queries resources related to specified Kubernetes object | [ResourceSelector](#resourceselector) |  |
    | test | Template to test the result against | [Template](#template) |  |
    | transform | Template to transform results to | [Template](#template) |  |

    ## LDAP (`ldap`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | **auth** | username and password value, configMapKeyRef or SecretKeyRef for LDAP server | [Authentication](#authentication) | Yes |
    | **bindDN** | BindDN to use in query | string | Yes |
    | description | Description for the check | string |  |
    | **host** | URL of LDAP server to be qeuried | string | Yes |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | name | Name of the check | string |  |
    | skipTLSVerify | Skip check of LDAP server TLS certificates | bool |  |
    | userSearch | UserSearch to use in query | string |  |

    ## MongoDB (`mongodb`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | auth | Username and password value, configMapKeyRef or SecretKeyRef for Mongo server | [Authentication](#authentication) |  |
    | **connection** | Connection string to connect to the Mongo server | string | Yes |
    | description | Description for the check | string |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | name | Name of the check | string |  |

    ## MsSQL (`mssql`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | auth |  | [Authentication](#authentication) |  |
    | **connection** |  | string | Yes |
    | description | Description for the check | string |  |
    | display |  | [Template](#template) |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | name | Name of the check | string |  |
    | **query** |  | string | Yes |
    | **results** | Number rows to check for | int | Yes |
    | test |  | [Template](#template) |  |

    ## MySQL (`mysql`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | auth | Username and password value, configMapKeyRef or SecretKeyRef for Postgres server | [Authentication](#authentication) |  |
    | **connection** | Connection string to connect to the MySQL server | string | Yes |
    | description | Description for the check | string |  |
    | display | Template to display query results in text (overrides default bar format for UI) | [Template](#template) |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | name | Name of the check | string |  |
    | **query** | query that needs to be executed on the server | string | Yes |
    | **results** | Number rows to check for | int | Yes |
    | test | Template to test the result against | [Template](#template) |  |

    ## Namespace (`namespace`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | deadline |
    | deleteTimeout |
    | description |
    | expectedContent |
    | expectedHttpStatuses |
    | httpRetryInterval |
    | httpTimeout |
    | icon |
    | ingressHost |
    | ingressName |
    | ingressTimeout |
    | labels |
    | name |
    | namespaceAnnotations |
    | namespaceLabels |
    | namespaceNamePrefix |
    | path |
    | podSpec |
    | port |
    | priorityClass |
    | readyTimeout |
    | schedule_timeout |

    ## Pod (`pod`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | deadline |
    | deleteTimeout |
    | description |
    | expectedContent |
    | expectedHttpStatuses |
    | httpRetryInterval |
    | httpTimeout |
    | icon |
    | ingressHost |
    | ingressName |
    | ingressTimeout |
    | labels |
    | name |
    | namespace |
    | path |
    | podSpec |
    | port |
    | priorityClass |
    | readyTimeout |
    | schedule_timeout |

    ## Postgres (`postgres`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | auth | username and password value, configMapKeyRef or SecretKeyRef for Postgres server | [Authentication](#authentication) |  |
    | **connection** | connection string to connect to the server | string | Yes |
    | description | Description for the check | string |  |
    | display | Template to display query results in text (overrides default bar format for UI) | [Template](#template) |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | name | Name of the check | string |  |
    | **query** | query that needs to be executed on the server | string | Yes |
    | **results** | Number rows to check for | int | Yes |
    | test | Template to test the result against | [Template](#template) |  |

    ## Prometheus (`prometheus`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | description | Description for the check | string |  |
    | display | Template to display the result in | [Template](#template) |  |
    | **host** | Address of the prometheus server | string | Yes |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | name | Name of the check | string |  |
    | **query** | PromQL query | string | Yes |
    | test | Template to test the result against | [Template](#template) |  |

    ## Redis (`redis`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | **addr** | host:port address | string | Yes |
    | auth | username and password value, configMapKeyRef or SecretKeyRef for redis server | *[Authentication](#authentication) |  |
    | **db** | Database to be selected after connecting to the server | int | Yes |
    | description | Description for the check | string |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | name | Name of the check | string |  |

    ## Restic (`restic`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | accessKey | AccessKey access key id for connection with aws s3, minio, wasabi, alibaba oss | *[kommons.EnvVar](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) |  |
    | caCert | CaCert path to the root cert. In case of self-signed certificates | string |  |
    | checkIntegrity | CheckIntegrity when enabled will check the Integrity and consistency of the restic reposiotry | bool |  |
    | description | Description for the check | string |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | **maxAge** | MaxAge for backup freshness | string | Yes |
    | name | Name of the check | string |  |
    | **password** | Password for the restic repository | *[kommons.EnvVar](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes |
    | **repository** | Repository The restic repository path eg: rest:https://user:pass@host:8000/ or rest:https://host:8000/ or s3:s3.amazonaws.com/bucket_name | string | Yes |
    | secretKey | SecretKey secret access key for connection with aws s3, minio, wasabi, alibaba oss | *[kommons.EnvVar](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) |  |

    ## S3 (`s3`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | **accessKey** | AWS access Key to access Bucket | string | Yes |
    | **bucket** | Array of [Bucket](#bucket) objects to be checked | [Bucket](#bucket) | Yes |
    | description | Description for the check | string |  |
    | icon | Icon for overwriting default icon on the dashboard | string |  |
    | name | Name of the check | string |  |
    | **objectPath** | Path of object in bucket to | string | Yes |
    | **secretKey** | AWS secret Key to access Bucket | string | Yes |
    | skipTLSVerify | Skip TLS verify when connecting to s3 | bool |  |

    ## TCP (`tcp`)
    | Field | Description | Scheme | Required |
    | ----- | ----------- | ------ | -------- |
    | description |
    | endpoint |
    | icon |
    | labels |
    | name |
    | thresholdMillis |


   
    ---


      
??? Config-db

??? Incident-commander
