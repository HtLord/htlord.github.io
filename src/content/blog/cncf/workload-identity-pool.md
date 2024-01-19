---
title: Workload Identity Pool
pubDate: '2023-12-09'
tags: 
  - wip
  - gcp 
---

Description
---
WIP allow you to communicate external service to GCP by roles which managed in IAM as SA. For example, running gclud or gutil on Github Action with set. This article will show the flow and caution. The steps will like:

1. Create a `Workload Identity Pool`
1. Create a `Workload Identity Provider`
1. Create a SA
1. Binding the SA with WI-Pool
1. Get WI-Provider name for Github Action
1. Create a yaml for github action as a scope of workflow

> Angle brackets is variable which depends on real github, gcp setups and personal preferences. For example, <gcp-project-id> may replace by hi-gcp.

Example
---

1. Create a Workload Identity Pool

    ```bash
    gcloud iam workload-identity-pools describe <wi-pool-name> \
      --project=<gcp-project-id> \
      --location="global" \
      --format="value(name)"
    ```

1. Create a Workload Identity Provider

    ```bash
    gcloud iam workload-identity-pools providers create-oidc <wi-provider-name> \
      --project=<gcp-project-id> \
      --location="global" \
      --workload-identity-pool=<wi-pool-name> \
      --display-name=<wi-pool-display-name> \
      --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
      --issuer-uri="https://token.actions.githubusercontent.com"
    ```

1. Create SA by GCP
1. Binding the SA with WI-Pool

    ```bash
    gcloud iam service-accounts add-iam-policy-binding <gcp-sa-name> \
      --project=<gcp-project-id> \
      --role="roles/iam.workloadIdentityUser" \
      --member="principalSet://iam.googleapis.com/projects/<gcp-project-number>/locations/global/workloadIdentityPools/<wi-pool-name>/attribute.repository/<github-account>/<github-repository>"
    ```

1. Get

    ```bash
    gcloud iam workload-identity-pools providers list \
        --location="global" \
        --workload-identity-pool=$WI_POOL_NAME
    ```

    Then you will get outputs like:

    ```bash
    ---
    attributeMapping:
      attribute.actor: assertion.actor
      attribute.repository: assertion.repository
      google.subject: assertion.sub
    displayName: wiprovider
    name: projects/<gcp-project-number>/locations/<the-location>/workloadIdentityPools/<wi-pool-name>/providers/<wi-provider-name>
    oidc:
      issuerUri: https://token.actions.githubusercontent.com
    state: ACTIVE
    ```

    Get copy of name of output (a.k.a <full-wi-provider-name> ) for Github Action later usage.

1. Create an example yaml

    ```yaml
    name: "Push Then Release"

    on:
      push:
        tags:
          - '[0-9]+.[0-9]+.[0-9]+'
    jobs:
      Build:
        runs-on: ubuntu-latest
        permissions:
          contents: 'read'
          id-token: 'write'
        steps:
          - uses: actions/checkout@v4
          - uses: google-github-actions/auth@v2
            with:
              project_id: <gcp-project-id>
              workload_identity_provider: '<full-wi-provider-name>'
              service_account: '<gcp-sa>'
          - uses: google-github-actions/setup-gcloud@v1
            with:
              version: '>= 416.0.0'

          - name: "Build project"
            run: |
                echo "...Building..."

          - name: "Auth for GCP by gcloud"
            run: |
                gcloud auth configure-docker

          - name: "Push image to gcp"
            run: |
                echo "...Pushing..."

      ```

    - Details for build project and upload to gcp will not mention here. Check [here](https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling#push-tagged) for push image to gcp.


    - Make sure you are using the latest version of github actions and always get updated.
    

    - Values for `with` in job, google-github-actions/auth@v2, must be setup directly string. If using environment or other may encounter some problems. 