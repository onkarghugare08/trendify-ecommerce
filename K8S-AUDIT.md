# K8S Audit

## My app

- **Name:** Trendify E-Commerce
- **Repo link:** https://github.com/onkarghugare08/trendify-ecommerce
- **Tiers:** Frontend – React served through Nginx; API – Node.js + Express; Database – MongoDB
- **Kubernetes manifests are in:** `k8s/`
- **Deployment environment:** AWS EC2 Ubuntu with a 3-node Kind cluster
- **Kubernetes context:** `kind-audit`
- **Namespace:** `trendify`

### How to run it from a fresh machine

```bash
kind create cluster --config kind/kind-config.yaml --name audit

# Install ingress-nginx
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.15.1/deploy/static/provider/kind/deploy.yaml

# Build application images
docker build -t trendify-backend:1.0 ./backend
docker build -t trendify-frontend:1.0 ./frontend

# Load images into Kind
kind load docker-image trendify-backend:1.0 --name audit
kind load docker-image trendify-frontend:1.0 --name audit

# Deploy Trendify
kubectl apply -f k8s/
```

- **How to open it:** Through the configured Kubernetes Ingress on the EC2 environment.

## Before you submit

- [x] "My app" is filled in and the run steps work on the current EC2/Kind setup
- [x] Every row has a status; every ✅ has evidence and a one-line reason
- [x] I ran `./audit.sh trendify` and recorded the final result
- [x] Manifests are in the repo and the evidence points to the relevant Kubernetes resources/commands

## How to fill the table

- **Status:** ✅ used and working. ⚠️ tried, or only partly used (say what is missing). ❌ not used.
- **Evidence:** command output or manifest location; no screenshot is required as proof.
- **Why I used it in my app:** one line explaining what would break or get worse without it.
- GitHub Actions is marked ❌ because the workflow was not working and the audit script did not detect a valid Kind deployment workflow.

## Audit

| Concept | Status (✅ / ⚠️ / ❌) | Evidence | Why I used it in my app | Where to look |
|---|---|---|---|---|
| Deployment + ReplicaSet | ✅ | `./audit.sh trendify` → **2 deployments**; `kubectl get rs -n trendify` shows backend/frontend ReplicaSets. | Deployments keep the required frontend/backend Pods running and ReplicaSets maintain the desired Pod count during updates. | `k8s/02-frontend-deployment.yml`, `k8s/04-backend-deployment.yml` |
| Service | ✅ | `./audit.sh trendify` → **3 services**; live services are `frontend`, `backend`, and `mongodb`. | Services provide stable DNS/network endpoints for the frontend, backend, and MongoDB Pods. | `k8s/03-frontend-service.yml`, `k8s/08-mongodb-service.yml`, `k8s/10-backend-service.yml` |
| Namespace | ✅ | `kubectl get all -n trendify` and `./audit.sh trendify` → **1 namespace besides default/system**. | Keeps the Trendify Kubernetes resources isolated from other workloads. | `k8s/01-namespace.yml` |
| Labels and selectors | ✅ | `./audit.sh trendify` → **3 services have endpoints, so selectors match Pod labels**. | Correct selectors are required so Services actually route traffic to the intended frontend, backend, and MongoDB Pods. | All Deployment/Service manifests in `k8s/` |
| Rolling update + rollback | ✅ | `./audit.sh trendify` → **1 deployment rolled to a new image**; `kubectl get rs -n trendify` shows the current backend ReplicaSet and previous ReplicaSet scaled to 0. | Allows backend image changes to be deployed safely and provides a rollback path when a release is not suitable. | `k8s/04-backend-deployment.yml`; rollout history/undo commands used during testing |
| ConfigMap | ✅ | `./audit.sh trendify` → **1 non-default ConfigMap**. | Stores non-sensitive application configuration separately from the container image. | `k8s/06-configmap.yml` |
| Secret | ✅ | `./audit.sh trendify` → **1 Opaque Secret**. | Keeps sensitive MongoDB/application credentials out of normal ConfigMap configuration. | `k8s/05-secrets.yml` |
| Requests and limits | ✅ | `./audit.sh trendify` → **4 of 4 containers have CPU and memory requests and limits**. | Gives Kubernetes resource expectations for scheduling and prevents a container from consuming unbounded resources. | Deployment/CronJob manifests in `k8s/` |
| Probes (liveness + readiness) | ✅ | `./audit.sh trendify` → **4 of 4 containers have both probes**. | Readiness prevents traffic from reaching an unready Pod, while liveness allows Kubernetes to recover an unhealthy container. | Frontend/backend/Mongo workload manifests in `k8s/` |
| PVC | ✅ | `kubectl get pvc -n trendify` → `mongodata-mongodb-0` is **Bound** to `mongo-pv`, capacity **1Gi**, `RWO`. | MongoDB needs persistent storage so database data survives Pod replacement. | `k8s/09-mongo_pv.yml`, `k8s/07-mongodb.yml` |
| Ingress | ✅ | `kubectl get ingress -n trendify` → `trendify-ingress`, class `nginx`; `./audit.sh trendify` → **1 ingress resource and 1 running controller Pod**. | Provides the external HTTP entry point and routes requests to the frontend Service. | `k8s/12-ingress.yml` |
| Multi-node kind cluster | ✅ | `kubectl get nodes` → `audit-control-plane`, `audit-worker`, `audit-worker2`; all **Ready**. | Demonstrates workload scheduling across multiple Kubernetes nodes instead of a single-node cluster. | `kind/kind-config.yaml`; `kubectl get nodes` |
| HPA (stretch) | ✅ | `kubectl get hpa -n trendify` → `frontend-hpa`, **min 1 / max 5**, CPU target **60%**, memory target **75%**; `./audit.sh trendify` → **1 HPA**. | Automatically adjusts frontend Pod count as resource usage changes. | `k8s/11-hpa.yml` |
| RBAC + ServiceAccount (stretch) | ✅ | `./audit.sh trendify` → **2 role/rolebindings and 1 custom ServiceAccount**. `kubectl auth can-i list pods ... --as=system:serviceaccount:trendify:trendify-viewer` → `yes`; delete pods → `no`. | Applies least privilege so the audit/viewer identity can inspect Pods without being allowed to delete them. | `k8s/13-rbac.yml` |
| CronJob (stretch) | ✅ | `kubectl get cronjob -n trendify` → `mongodb-backup-cronjob`, schedule **`0 2 * * *`**; `./audit.sh trendify` → **1 CronJob**. | Automates recurring MongoDB backup work instead of requiring manual execution. | `k8s/14-backup-cronjob.yml` |
| GitHub Actions deploying to kind (stretch) | ❌ | `./audit.sh trendify` → **looks for `kind create cluster` / `helm/kind-action` in `./.github/workflows`** and did not find a valid workflow. | Intended to automate validation/deployment, but the current GitHub Actions workflow is not working, so it is not claimed as completed. | `.github/workflows/` |

## Live cluster evidence

### Cluster nodes

```text
NAME                  STATUS   ROLES           VERSION
 audit-control-plane   Ready    control-plane   v1.36.1
 audit-worker          Ready    <none>          v1.36.1
 audit-worker2         Ready    <none>          v1.36.1
```

### Trendify workloads

```text
Pods:
2 backend Pods      Running
1 frontend Pod      Running
1 MongoDB Pod       Running

Services:
frontend   ClusterIP   80/TCP
backend    ClusterIP   5000/TCP
mongodb    ClusterIP   27017/TCP

Deployments:
ecommerce-backend-deployment    2/2
 ecommerce-frontend-deployment   1/1

StatefulSet:
mongodb                          1/1
```

### Persistent storage

```text
mongodata-mongodb-0   Bound   mongo-pv   1Gi   RWO   manual
```

### Ingress

```text
trendify-ingress   nginx   trendify.localtest.me   localhost   80
```

### HPA

```text
frontend-hpa   Deployment/ecommerce-frontend-deployment
CPU: 1%/60%
Memory: 2%/75%
MINPODS: 1
MAXPODS: 5
REPLICAS: 1
```

### RBAC checks

```text
list pods as trendify-viewer:   yes
delete pods as trendify-viewer: no
```

### Final audit result

```text
context: Kind-audit
scope: trendify

Seen: 15/16 (must 12/12, stretch 3/4)
Pass mark: 10+
```

## Score

- **Must-have concepts with ✅ and evidence (12 max): 12/12**
- **Stretch concepts with ✅ and evidence (4 max): 3/4**
- **Total: 15/16**

## What was hard / what I would change

The main challenges were running a multi-node Kind cluster on an AWS EC2 Ubuntu environment, connecting the frontend, backend, and MongoDB through Kubernetes Services, configuring Ingress networking, and validating MongoDB persistence with a PVC. The HPA and RBAC stretch requirements were also tested on the live cluster. The remaining improvement would be fixing the GitHub Actions workflow so the Kubernetes deployment can be automated through CI/CD.
