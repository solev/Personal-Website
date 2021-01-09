---
title: 'How to access micro-services (pods) in Kubernetes that are not publicly available'
date: '2020-01-31'
---

Imagine this scenario: You are developing an API on your machine and everything works well, then you deploy it on a Kubernetes cluster. Now you want to test if the API works on Kubernetes, but without exposing it to the public.


To demonstrate this, I have a fresh install of [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/) so:
```shell
❯ kubectl get pods
No resources found.
```
I will deploy a simple **echoserver** image to have something to make requests to.
> echoserver is like an API that returns (echoes) back what you sent it

I have a `yaml` config in this [gist](https://gist.github.com/solev/4ff8c43e0d003b99b76a99082196575c) for that

```shell
❯ kubectl apply -f https://gist.githubusercontent.com/solev/4ff8c43e0d003b99b76a99082196575c/raw
deployment.apps/echoserver created
❯ kubectl get pods
NAME                          READY   STATUS    RESTARTS   AGE
echoserver-867b47487f-rhc62   1/1     Running   0          28s
```

The pod is running now and is configured to listen to port `8080` as configured in the yaml. Now if we try to do a request, it will fail because the pod is not accessible:
```shell
❯ curl localhost:8080?hello=world
curl: (7) Failed to connect to localhost port 8080: Connection refused
```

In order to access it, there is a command called `port-forward` in **kubectl** that lets you forward any request on your local machine to a specific deployment on kubernetes.

```shell
❯ kubectl port-forward deployment/echoserver 3000:8080
Forwarding from 127.0.0.1:3000 -> 8080
Forwarding from [::1]:3000 -> 8080
```

What this means is now every request on `localhost` port `3000` will be forwarded to the `echoserver` pod on port `8080`. So now if we try the same request:

```shell
❯ curl localhost:3000?hello=world
CLIENT VALUES:
client_address=('127.0.0.1', 56394) (127.0.0.1)
command=GET
path=/?hello=world
real path=/
query=hello=world
request_version=HTTP/1.1

SERVER VALUES:
server_version=BaseHTTP/0.6
sys_version=Python/3.5.0
protocol_version=HTTP/1.0

HEADERS RECEIVED:
Accept=*/*
Host=localhost:3000
User-Agent=curl/7.55.1
```

And that's about it. Thanks for reading, catch ya in the next one.