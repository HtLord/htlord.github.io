---
title: K8s 入門 
tags: 
  - k8s
pubDate:
description: 快速了解 Node, Pod, Service, Ingress 開啟使用，K8s 的世界。 
---

### 概念
  K8s 是一個方便管理各種程式應用的擴展、管理工具。他會幫你管理多台電腦(Node)，並幫你部署想要提供的服務(Pod)。
  在沒有這個工具的年代，你只能一台一台電腦的安裝，你想要的提供的服務。此篇文章會簡單帶過 K8s 的運作機制觀念。

### 導覽
- K8s 結構
- Node
- Pod
- Service
- Ingress
- 開始使用、部署你的 K8s
- 使用 GKE 來建制 K8s 來控管你的服務

### 前置觀念
- Containerize
- Yaml
- Cli tool

### K8s 結構
![K8s component](https://d33wubrfki0l68.cloudfront.net/2475489eaf20163ec0f54ddc1d92aa8d4c87c96b/e7c81/images/docs/components-of-kubernetes.svg)
入門使用個人認為只要能理解 Node, Pod, Service, Ingress 這幾項 component 就可以開始你愉快的 K8s 部署之旅。

### Node
你可以把它想像做你的電腦，然後有很多台，且由 K8s 會幫你一並管理怎麼部署以及擴展。1.20 版之後，會提示不再提供使用 Docker 作為 runtime，將在 1.23 之後正式不再支援。但這邊不用擔心使用 Docker build 的image 不能被 K8s 使用。細節就不在本文展開了。

### Pod
如果你使用過 `Docker`, `Containerd`, `CRI-O`，相信你會很熟悉 images，Pod 會包含一個或數個 image，至於怎麼分配，就看需求以及個人喜好了。換個說法，他就是你的service, application, api, database, web host, etc,.。 

### Service
當你部署完了 Pod 僅僅只是把你的服務放上了 K8s 的 Node 當中，他現在仍未有對外的工作能力。因此，你需要藉由部署 service 告訴 K8s 來導流外部的要求到負責的 Pods 甚至是附載平衡。

### Ingress
當你確定了 service 跟對應提供該功能的 pods 後，外部網路進出與 K8s 溝通的出入口也需要被部署。因此 Ingress 就是負責定義，怎樣的請求要被發送到哪個 service，而這個 service 會由 K8s 幫你監控，並計算應當導流到哪個 pod 去做運算。

### 開始使用、部署你的 K8s
這邊有數種方式可以建置 K8s
- 自行建置 K8s ，包含實體機械、網路、軟體安裝
- 雲端服務平台 GCP, Amazon, Azure, etc,.

### 使用 GKE 來建制 K8s 來控管你的服務
1. 開始之前，確認你已經安裝好 gcloud, kubectl，建議使用 linux like 作業系統下操作(mac, ubuntu, debian, WSL, etc,.)。
1. 在使用 GKE 前，你需要設定好 VPC，如過你已經迫不及待要開始使用了，你可以直接使用，開啟專案之後內建的 default 網路，但是在正式環境，則仍是建議使用自己定義的 VPC 網路。
1. 接著到 GKE &gt; Cluster 來設定你的 K8s 會使用到的 Node，在這邊，你可以選擇你的服務區域，跟你想要的 Node 數量、機器的等級（CPU cores, Memory size, Disk type, Disk size）、GCP 其他服的權限、K8s labels、etc,.至於其他項目，可以根據你自己的需求依序慢慢研究，基本上，你可以先都不做設定就可以開始操作了。
1. 現在你已經可以只靠著 gcloud, kubectl 來部署 K8s resources 了。
1. 開始部署 K8s resource 之前，你需要由 `gcloud` 取得 cluster config(context), credential。
1.  在 terminal 執行這到指另，他會轉跳到瀏覽器，並要求你登入 google 帳號。注意要登對帳號，包含前面你剛才創建的 cluster 即可。
```
gcloud auth login
```
    
1.  取得 kubectl 所需的設定，使得你可以藉由 kubectl 來操作你的 cluster
```
# gcloud container clusters get-credentials <your-cluster-name> --region=<your-cluster-region>
gcloud container clusters get-credentials hello-cluster --region=asia-east1
```
        
1.  確認是否上述的操作成功，並且拿到完整的 cluster 名稱，這個指令也能在你後續的歷程裡協助你除錯。這邊你要複製 contexts.name 以便後續使用。
```
kubectl config view
# 他會印出類似如下的 yaml 格式訊息
apiVersion: v1
clusters:
    \- cluster:
        certificate-authority-data: ...
        server: ...
contexts:
    \- context:
        cluster: ...
        user: ...
        name: hello-test-cluster
```
    
1.  指定你預計要操作的 cluster
```
# kubectl config use-context <your-cluster-name>
kubectl config use-context hello-test-cluster
```
    
1. 你可以開始部署 pod, service, etc,. K8s 定義的 resource，這邊要特別注意，每個版本的可能都有點不同，需要特別注意你使用的版本是否有符合你的需求。
```
# kubectl apply -f <your-resource-yaml-file-location>
kubectl apply -f ./hello-pod.yaml
```
 
> GCP 會把一群同樣設定的 Nodes 稱作為 `pool`，在 `Node pool details` 底下有個 size 設定，假設你設定 1 他並不會只產生個 Node（一台機器），他會根據你選的 Zonal 跟 Regional 有所影響，而產生 pool 要花費很多時間，所以在這訂這一項的時候，務必小心並多次確認。雖然你仍有辦法無痛替換 pool 但是他仍要花費很多時間去刪除 pool，這段時間你的金錢跟時間就不斷地在燃燒著。


### Reference
- [Kubernetes official site](https://kubernetes.io/)
- [Installing Google Cloud SDK](https://cloud.google.com/sdk/docs/install#linux)  