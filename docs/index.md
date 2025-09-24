# Introduction

## What is lttle.cloud

[lttle.cloud](https://lttle.cloud) is an open-source, OCI-compliant serverless-first cloud platform designed for workloads that demand **low-latency** and **cost efficiency**. Unlike conventional serverless systems, it leverages a unique architecture that optimizes resource allocation and minimizes cold start times, ensuring that applications run smoothly and efficiently.

It provides flexible low-level primitives for developers to build and deploy the stacks that they desire with ease.

Influenced by the [Unikraft Cloud](https://unikraft.cloud/), the way it achieves this is by leveraging micro VMs via KVM and a minimal linux distribution. You can read more about this in the [Advanced](./advanced/architecture.md) section.

## Open Source

lttle.cloud is not just a cloud platform &mdash; it is a fully open source AGPL-3.0 project. This means that developers can inspect, modify, and enhance the platform to suit their needs.

While lttle.cloud can be used as a managed platform, it is also self-hostable. This means you can deploy the entire stack on your own infrastructure &mdash; wether on bare metal, private cloud or on other public clouds &mdash; with the same capabilities as the managed offering.

## OCI-compliant

We plan to be fully OCI-compliant, meaning that you will be able to deploy any OCI-compliant image and run it on lttle.cloud.

:::warning Work in Progress

Currently, lttle.cloud supports a subset of OCI images and capabilities. We are actively working on expanding this support to cover more use cases and image types.

:::

## Serverless-first

Images can be deployed to run both serverless and traditional workloads. This flexibility allows developers to choose the best execution model for their applications.

Keep in mind that while lttle.cloud supports both models, the serverless experience is optimized for low-latency and cost efficiency. The traditional model may not offer the same cost-effectiveness.

## Low latency by design

One of the main differentiators of lttle.cloud is its ability to start machines in under 10 milliseconds. Traditional serverless platforms often suffer from cold starts.

## Cost-effectiveness

lttle.cloud is cost-efficient. By optimizing resource allocation and minimizing overhead, it ensures that you only pay for what you use. By using lttle.clouds snapshotting features you get to pay for the exact resources your application consumes, without any hidden costs.
