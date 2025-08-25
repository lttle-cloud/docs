FROM typesense/docsearch-scraper:0.11.0

COPY ./typesense-scraper.production.config.json /typesense-scraper.config.json