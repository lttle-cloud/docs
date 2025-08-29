# Testing

## Prerequisites

All of our load tests are written with Grafana K6. Before you begin testing, ensure you install [K6 and set everything up](https://grafana.com/docs/k6/latest/set-up/).

## Load Testing

We are employing 3 tests

- Simple Load
- User visiting the everything
- Searching

## Running Tests

To run the tests, use the following command:

```bash
k6 run tests/load/simple.k6.ts
```
