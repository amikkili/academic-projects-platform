# Skill bullet knowledge base
# Each tier has 6-8 bullets so the seeded shuffler can pick varied subsets per user.
# Tiers: "fresher" (0 yrs) | "junior" (1-2 yrs) | "mid" (3-5 yrs) | "senior" (6+ yrs)

SKILL_BULLETS = {

    # ── Languages ─────────────────────────────────────────────────────────────

    "java": {
        "fresher": [
            "Developed object-oriented Java applications applying inheritance, polymorphism, encapsulation, and exception handling.",
            "Implemented core data structures and sorting algorithms in Java using Collections, Generics, and the Stream API.",
            "Built multi-threaded Java console applications using Runnable, Thread, and basic synchronisation primitives.",
            "Integrated Java applications with relational databases using JDBC, writing parameterised SQL queries to prevent injection.",
            "Applied design patterns (Singleton, Factory, Observer) in academic Java projects to improve code maintainability.",
            "Wrote JUnit test cases for Java utility classes, practising test-driven development on academic assignments.",
            "Developed file-based persistence in Java using serialisation and buffered I/O streams for data storage.",
        ],
        "junior": [
            "Built RESTful APIs with Java 11 and Spring Boot, using Spring Data JPA and Hibernate for database persistence.",
            "Wrote unit and integration tests using JUnit 5 and Mockito, maintaining 80%+ code coverage across service layers.",
            "Designed service-layer components following SOLID principles, applying Factory and Strategy design patterns.",
            "Integrated Java applications with MySQL via JDBC and Hibernate ORM, optimising N+1 query issues.",
            "Implemented Spring Security for JWT-based authentication and role-based authorisation in REST APIs.",
            "Configured Maven/Gradle build pipelines and participated in code reviews enforcing consistent coding standards.",
            "Developed asynchronous email and notification features using Spring's @Async and JavaMailSender.",
        ],
        "mid": [
            "Designed and maintained scalable microservices in Java 17 and Spring Boot 3, serving 100K+ daily requests with 99.9% uptime.",
            "Optimised JVM performance through heap profiling, GC tuning, and connection pool sizing, reducing average latency by 35%.",
            "Led migration of a legacy Java 8 monolith to Java 17, improving startup time by 40% and cutting memory footprint by 25%.",
            "Implemented distributed caching with Redis and Spring Cache, reducing database read load by 60% on hot query paths.",
            "Developed event-driven processing pipelines using Java ExecutorService and CompletableFuture for non-blocking workflows.",
            "Built reactive microservices with Spring WebFlux and Project Reactor, handling 10K+ concurrent connections without thread blocking.",
            "Introduced SonarQube quality gates and Checkstyle rules into the CI pipeline, eliminating entire classes of recurring code issues.",
        ],
        "senior": [
            "Architected an event-driven microservices platform in Java with Apache Kafka processing 1M+ events/day at sub-100ms latency.",
            "Led a team of 8 engineers re-platforming a Java 8 monolith into 12 Spring Boot microservices, reducing infra cost by 40%.",
            "Defined Java coding standards, architecture review checklists, and automated quality gates adopted across a 60-engineer org.",
            "Designed fault-tolerant distributed systems using Resilience4j circuit breakers, bulkheads, and retry policies.",
            "Introduced GraalVM native image builds for latency-sensitive Java services, cutting cold-start time from 4s to 80ms.",
            "Mentored 6 mid-level engineers through weekly design reviews, accelerating their progression to senior in under 18 months.",
        ],
    },

    "python": {
        "fresher": [
            "Developed Python scripts for data processing, file automation, and web scraping using BeautifulSoup and Requests.",
            "Built supervised ML models in Python using scikit-learn for classification and regression tasks on academic datasets.",
            "Created data visualisations with Matplotlib and Seaborn to communicate project results and exploratory findings.",
            "Applied pandas for data cleaning — handling nulls, duplicates, and type coercion — on real-world CSV datasets.",
            "Implemented Python CLI tools using argparse and packaged them as reusable modules with setup.py.",
            "Used Python virtual environments, pip, and requirements.txt to manage reproducible project dependencies.",
            "Wrote pytest unit tests with fixtures and parametrised cases, achieving 80%+ coverage on utility modules.",
        ],
        "junior": [
            "Built RESTful APIs using FastAPI and Flask, with SQLAlchemy ORM for PostgreSQL and MySQL integration.",
            "Developed end-to-end ML pipelines — ingestion, preprocessing, training, evaluation — using scikit-learn and MLflow.",
            "Automated data ingestion and transformation jobs using Python scripts scheduled with cron and Celery.",
            "Wrote pytest suites with fixtures, mocks, and parametrised tests, maintaining 85%+ coverage across service layers.",
            "Integrated third-party APIs (Stripe, Twilio, SendGrid) using Python Requests with retry/backoff handling.",
            "Built data validation layers using Pydantic models, catching schema violations before they reached the database.",
            "Containerised Python services with Docker, writing multi-stage Dockerfiles to keep image sizes under 150MB.",
        ],
        "mid": [
            "Designed end-to-end ML pipelines with scikit-learn, XGBoost, and MLflow for experiment tracking and model registry.",
            "Built high-throughput async services with Python asyncio and FastAPI, handling 50K+ requests/hour at sub-20ms latency.",
            "Implemented NLP pipelines using spaCy and Hugging Face Transformers for text classification and named-entity recognition.",
            "Reduced ETL processing time by 65% by rewriting batch jobs using vectorised Pandas operations and Dask parallelism.",
            "Profiled Python applications with cProfile and py-spy, eliminating CPU hotspots that caused intermittent SLA breaches.",
            "Built feature engineering pipelines with automated drift detection, reducing model degradation incidents by 70%.",
            "Led Python 2 to Python 3 migration across a 40K-line codebase, resolving 200+ compatibility issues with zero downtime.",
        ],
        "senior": [
            "Architected a Python-based ML serving platform delivering 200K+ predictions/day at <50ms p95 latency on AWS ECS.",
            "Led MLOps adoption — model versioning, automated retraining, and drift monitoring — cutting model incidents by 80%.",
            "Designed distributed training pipelines in PyTorch and Ray, reducing model training time from 8 hours to 45 minutes.",
            "Defined Python coding standards, linting rules (ruff, mypy), and pre-commit hooks adopted across 12 repositories.",
            "Built a Python internal framework abstracting database, cache, and queue clients, reducing new service bootstrap from 2 days to 2 hours.",
            "Guided a team of 7 data engineers migrating from ad-hoc Jupyter notebooks to a production-grade pipeline platform.",
        ],
    },

    "javascript": {
        "fresher": [
            "Built interactive web pages using HTML, CSS, and vanilla JavaScript implementing DOM manipulation and event-driven logic.",
            "Used JavaScript ES6+ features — arrow functions, destructuring, spread, Promises, and async/await — in academic projects.",
            "Created small web applications with localStorage for client-side state and the Fetch API for HTTP requests.",
            "Implemented form validation and error display in JavaScript without third-party libraries.",
            "Practised functional array methods (map, filter, reduce) to transform and aggregate data in frontend applications.",
            "Debugged JavaScript applications using Chrome DevTools — breakpoints, network tab, and console profiling.",
        ],
        "junior": [
            "Developed React.js components and custom hooks, consuming REST APIs with Axios and managing state with Context API.",
            "Implemented responsive UI layouts with CSS Flexbox/Grid and JavaScript-driven micro-animations.",
            "Built Node.js/Express backend services consuming MongoDB via Mongoose and exposing REST endpoints.",
            "Wrote unit tests for JavaScript modules using Jest and component tests with React Testing Library.",
            "Integrated third-party JS libraries (Chart.js, Leaflet, Stripe.js) into production web applications.",
            "Used ESLint and Prettier with pre-commit hooks to enforce consistent code style across team repositories.",
        ],
        "mid": [
            "Architected scalable React applications with Redux Toolkit, code splitting, and lazy loading, reducing bundle size by 45%.",
            "Built real-time features using WebSockets and Socket.io supporting 5K+ concurrent connections.",
            "Optimised JavaScript performance using memoisation, virtual scrolling, and Lighthouse audits, achieving 95+ performance score.",
            "Developed full-stack TypeScript features across Next.js frontend and Node.js microservices with end-to-end type safety.",
            "Migrated a jQuery legacy frontend to React 18, delivering in 3 months with zero regressions in existing features.",
            "Implemented micro-frontend architecture with Module Federation, enabling independent team deployments across 5 product squads.",
            "Introduced Web Workers for CPU-intensive data transformations, keeping the main thread free and eliminating UI jank.",
        ],
        "senior": [
            "Led frontend architecture decisions for a React/TypeScript platform serving 2M+ monthly active users.",
            "Defined JavaScript/TypeScript coding standards, component design system, and automated accessibility audits across 8 teams.",
            "Reduced page load time from 4.2s to 0.8s through SSR, CDN edge caching, and critical-path CSS inlining.",
            "Championed a monorepo migration with Nx, enabling shared libraries and incremental builds that cut CI time by 55%.",
            "Drove adoption of Storybook-driven component development and visual regression tests, eliminating UI regressions in releases.",
            "Hired and onboarded 5 frontend engineers, establishing pairing practices and a technical growth ladder.",
        ],
    },

    "typescript": {
        "fresher": [
            "Applied TypeScript types, interfaces, and generics to improve correctness and IDE autocomplete in academic JS projects.",
            "Converted existing JavaScript modules to TypeScript, eliminating runtime type errors caught at compile time.",
            "Used TypeScript union types and type guards to safely handle API response variants.",
            "Defined shared TypeScript interfaces for request/response shapes between frontend components and mock APIs.",
        ],
        "junior": [
            "Developed typed React components and custom hooks in TypeScript, reducing runtime errors by 70%.",
            "Defined shared TypeScript DTOs across frontend and backend Node.js services, preventing API contract drift.",
            "Used TypeScript utility types (Partial, Pick, Omit, Record) to derive types without duplication.",
            "Configured strict TypeScript compiler options and integrated tsc into CI to catch type errors before merge.",
            "Wrote TypeScript generics for reusable data-fetching hooks that work across multiple entity types.",
        ],
        "mid": [
            "Designed strict TypeScript generics and utility types for a shared component library used across 6 product teams.",
            "Migrated a 40K-line JavaScript codebase to TypeScript, surfacing and fixing 120+ latent bugs in the process.",
            "Implemented end-to-end type safety across Next.js and Node.js using tRPC, eliminating API contract mismatches.",
            "Authored TypeScript declaration files for internal Python-generated JSON configs, providing type-safe config access.",
            "Enforced branded types for domain primitives (UserId, OrderId) preventing accidental cross-entity ID mixups.",
        ],
        "senior": [
            "Established TypeScript architecture guidelines and CI type-check gates across 15 frontend repositories.",
            "Authored internal TypeScript compiler plugins and transformer macros to enforce domain-specific invariants at build time.",
            "Led TypeScript upgrade strategy from 4.x to 5.x across 20 packages with zero breaking changes in dependent apps.",
            "Designed a type-safe API layer that eliminated an entire category of production bugs from untyped fetch responses.",
            "Defined TypeScript monorepo conventions — path aliases, project references, composite builds — reducing tsc build time by 60%.",
        ],
    },

    "c++": {
        "fresher": [
            "Implemented classic data structures (linked lists, BSTs, graphs) and sorting algorithms in C++ for academic coursework.",
            "Developed object-oriented C++ programs using templates, operator overloading, copy/move semantics, and RAII.",
            "Used STL containers (vector, map, set, queue) and algorithms (sort, find, accumulate) in competitive programming.",
            "Managed dynamic memory with new/delete and refactored to smart pointers (unique_ptr, shared_ptr) to prevent leaks.",
        ],
        "junior": [
            "Built performance-critical C++ modules with STL and smart pointers, eliminating memory leaks confirmed by Valgrind.",
            "Developed multi-threaded C++ applications using std::thread, mutex, and condition_variable for concurrent data processing.",
            "Implemented custom allocators and memory pools in C++ to reduce heap fragmentation in real-time systems.",
            "Profiled C++ applications with gprof and perf, identifying and eliminating hotspots that caused latency spikes.",
        ],
        "mid": [
            "Designed high-performance C++ services processing 500K events/second using lock-free queues and cache-aware layouts.",
            "Reduced application memory usage by 50% through object pooling, custom allocators, and struct packing in C++17.",
            "Rewrote a Python data processing module in C++ with pybind11, achieving a 40× speedup while keeping the Python API.",
            "Applied CRTP, policy-based design, and template metaprogramming to build zero-overhead abstractions in C++17.",
            "Implemented thread-safe producer-consumer pipelines using C++20 coroutines and std::jthread.",
        ],
        "senior": [
            "Architected low-latency trading systems in C++20 with sub-microsecond hot paths and SIMD vectorisation.",
            "Led a C++ modernisation from C++03 to C++17 across a 500K-line codebase, improving compile time by 60%.",
            "Defined C++ code review standards focusing on undefined behaviour, ABI stability, and exception safety guarantees.",
            "Designed a plugin system in C++ using shared libraries and vtable contracts, enabling hot-reload without restarting.",
        ],
    },

    "go": {
        "fresher": [
            "Built CLI tools and basic HTTP servers in Go, learning goroutines, channels, and the Go concurrency model.",
            "Implemented Go interfaces and embedding to write composable, testable service components.",
            "Used Go's standard library (net/http, encoding/json, os) to build self-contained utilities without third-party deps.",
        ],
        "junior": [
            "Developed microservices in Go with the Gin framework, integrating PostgreSQL via pgx and managing migrations with golang-migrate.",
            "Implemented goroutine-based worker pools and fan-out/fan-in patterns for concurrent job processing.",
            "Wrote Go table-driven tests and benchmarks, keeping coverage above 85% and identifying performance regressions early.",
            "Used Go contexts for deadline propagation and graceful shutdown across HTTP handlers and database calls.",
        ],
        "mid": [
            "Built high-throughput Go services handling 200K requests/second with sub-5ms p99 latency and zero-downtime deploys.",
            "Designed Go microservices with gRPC and Protocol Buffers for efficient binary inter-service communication.",
            "Reduced Docker image size by 85% using multi-stage Go builds and scratch base images.",
            "Implemented distributed tracing with OpenTelemetry in Go services, cutting mean-time-to-diagnose incidents by 60%.",
            "Optimised Go GC pressure by reducing allocations in hot paths through sync.Pool and pre-allocated byte slices.",
        ],
        "senior": [
            "Architected a Go-based API gateway processing 1M+ requests/minute with auth, routing, rate limiting, and tracing.",
            "Led a Go platform team defining service templates, observability patterns, and release automation for 20+ services.",
            "Designed a Go plugin system with runtime loading, enabling feature additions without binary redeployment.",
            "Established Go coding standards and linting rules (golangci-lint) adopted across 30 repositories org-wide.",
        ],
    },

    # ── Frontend Frameworks ───────────────────────────────────────────────────

    "react": {
        "fresher": [
            "Built React SPAs with functional components, useState/useEffect hooks, and React Router for client-side navigation.",
            "Consumed REST APIs in React with Axios, handling loading states, errors, and paginated list rendering.",
            "Lifted state to parent components and passed data via props, following unidirectional data-flow patterns.",
            "Used React Context API to share global state (theme, user session) across component trees without prop drilling.",
            "Created reusable form components in React with controlled inputs and client-side validation.",
        ],
        "junior": [
            "Developed a reusable React component library with custom hooks, memoised selectors, and published to an internal registry.",
            "Implemented form validation, error boundaries, and skeleton loaders for improved perceived performance.",
            "Managed server state with React Query — caching, background refetch, and optimistic updates.",
            "Wrote unit and integration tests using Jest and React Testing Library, covering user interactions and async flows.",
            "Integrated React apps with authentication (JWT, OAuth) handling token refresh and protected route guards.",
            "Used React.memo, useMemo, and useCallback to eliminate unnecessary re-renders in performance-sensitive lists.",
        ],
        "mid": [
            "Architected React apps with Redux Toolkit, memoised selectors, and code splitting, shrinking initial bundle by 40%.",
            "Built an accessible React component library (WCAG 2.1 AA) adopted across 5 product teams.",
            "Improved Lighthouse performance score from 62 to 96 through lazy loading, virtualised lists, and image optimisation.",
            "Designed a headless React table/chart component with pluggable renderers, used by 3 different data products.",
            "Migrated a class-component codebase to React hooks and Suspense, reducing component boilerplate by 35%.",
            "Implemented micro-frontend shell with React and Module Federation, enabling 4 teams to deploy independently.",
        ],
        "senior": [
            "Defined React architecture standards for a platform serving 3M+ monthly users, including SSR strategy with Next.js.",
            "Led migration from class components to React 18 concurrent features, reducing re-renders by 55%.",
            "Built a React design system with Storybook, Chromatic visual regression, and automated a11y audits serving 8 teams.",
            "Established performance budgets and Lighthouse CI checks keeping LCP < 1.8s across all product routes.",
            "Authored internal React error-boundary framework with Sentry integration, reducing mean-time-to-detect issues by 70%.",
        ],
    },

    "angular": {
        "fresher": [
            "Built Angular SPAs using components, services, and two-way data binding with TypeScript.",
            "Implemented Angular routing, lazy-loaded feature modules, and reactive forms with built-in validators.",
            "Used Angular's HttpClient module to consume REST APIs and display data with *ngFor and *ngIf directives.",
            "Applied Angular component lifecycle hooks (ngOnInit, ngOnDestroy) for setup and teardown logic.",
        ],
        "junior": [
            "Developed Angular features using RxJS observables for async data flows and HttpClient for API integration.",
            "Wrote unit tests for Angular components and services using Jasmine and Karma, maintaining 80%+ coverage.",
            "Implemented Angular animations and route transitions for polished navigation experiences.",
            "Used Angular HTTP Interceptors for JWT attachment, error handling, and global loading-state management.",
            "Built custom Angular pipes and directives to encapsulate reusable view-layer transformation logic.",
        ],
        "mid": [
            "Architected Angular monorepo with Nx, shared libraries, and feature modules, reducing build time by 50%.",
            "Implemented NgRx state management with effects, selectors, and entity adapters across a large enterprise application.",
            "Optimised Angular app bundle from 4MB to 1.1MB through differential loading, tree shaking, and lazy routes.",
            "Built reusable Angular CDK-based overlay and drag-drop components used across 4 product teams.",
            "Implemented server-side rendering with Angular Universal, improving first contentful paint by 65%.",
        ],
        "senior": [
            "Led Angular upgrade from AngularJS to Angular 17 across a 200K-line enterprise application with zero downtime.",
            "Defined Angular performance budgets and Lighthouse CI checks, keeping LCP under 1.5s across all routes.",
            "Designed Angular micro-frontend architecture with Module Federation, enabling 5 teams to release independently.",
            "Established RxJS best-practices guide eliminating memory leaks from unsubscribed observables across 20 components.",
        ],
    },

    "vue": {
        "fresher": [
            "Built Vue.js SPAs using single-file components, Vuex for state management, and Vue Router for navigation.",
            "Used Vue's reactivity system (ref, reactive, computed) to build data-driven UI components.",
            "Created reusable Vue components with props, emits, and slots for flexible layout composition.",
        ],
        "junior": [
            "Developed Vue 3 components with the Composition API and reactive refs for complex UI interactions.",
            "Integrated Vue apps with REST APIs using Axios, adding error handling and loading states with composables.",
            "Wrote unit tests for Vue components using Vitest and Vue Test Utils.",
            "Used Pinia for global state management, replacing Vuex with simpler, TypeScript-friendly stores.",
        ],
        "mid": [
            "Architected Vue 3 + Pinia application with server-side rendering via Nuxt 3, improving SEO and initial load by 60%.",
            "Built a Vue component library with Storybook documentation and published to an internal npm registry.",
            "Optimised Vue app performance using defineAsyncComponent, v-memo, and shallowRef for large data tables.",
            "Implemented Vue Router navigation guards and meta-field-driven auth, securing 30+ protected routes.",
        ],
        "senior": [
            "Led Vue 3 migration from Vue 2, delivering ahead of schedule with full backward compatibility for legacy pages.",
            "Defined Vue coding conventions and a composable pattern library adopted across 6 frontend teams.",
            "Architected Nuxt 3 platform with edge rendering, ISR, and CDN caching achieving sub-500ms TTFB globally.",
        ],
    },

    # ── Backend Frameworks ────────────────────────────────────────────────────

    "spring boot": {
        "fresher": [
            "Built Spring Boot REST APIs using auto-configuration, dependency injection, and Spring Data JPA for database access.",
            "Implemented CRUD endpoints with Spring MVC using @RestController, @RequestBody, and ResponseEntity.",
            "Integrated H2 in-memory database for local development and switched to MySQL in production via application.properties.",
            "Used Spring Boot Actuator endpoints to monitor application health and expose metrics in academic projects.",
        ],
        "junior": [
            "Developed Spring Boot microservices with Spring Security (JWT), Spring Data JPA, and OpenAPI/Swagger documentation.",
            "Implemented Spring Batch jobs for nightly data processing, handling 500K+ records per run with retry logic.",
            "Used Spring's @Transactional and optimistic locking to ensure data consistency under concurrent writes.",
            "Wrote integration tests with @SpringBootTest and MockMvc, covering controller, service, and repository layers.",
            "Configured Spring Profiles for environment-specific settings and Spring Cloud Config for centralised configuration.",
        ],
        "mid": [
            "Designed Spring Boot microservices with Resilience4j circuit breakers, distributed tracing (Sleuth/Zipkin), and centralised config.",
            "Optimised Spring Boot startup time by 55% using lazy initialisation and GraalVM native image compilation.",
            "Built reactive Spring WebFlux services with R2DBC for non-blocking database access under high concurrency.",
            "Implemented event-driven communication between Spring Boot services using Kafka and Spring Cloud Stream.",
            "Reduced Spring Boot JVM heap usage by 40% by right-sizing thread pools and tuning Hikari connection pool settings.",
            "Built a custom Spring Boot Starter to standardise logging, metrics, and security across 15 internal services.",
        ],
        "senior": [
            "Architected a Spring Boot microservices platform with Istio service mesh, handling 5M+ daily transactions.",
            "Defined Spring Boot project templates and architectural standards adopted across a 50-engineer organisation.",
            "Led Spring Boot 2 to 3 migration across 20 services, handling Jakarta EE namespace changes with zero downtime.",
            "Designed multi-tenant Spring Boot SaaS platform with per-tenant datasource routing and schema isolation.",
            "Built a shared Spring Boot security library providing OAuth2/OIDC SSO across 12 internal applications.",
        ],
    },

    "node.js": {
        "fresher": [
            "Built Node.js REST APIs with Express.js, implementing CRUD operations and middleware for logging and error handling.",
            "Used Node.js built-in modules (fs, path, http) to build file-server utilities and CLI tools.",
            "Connected Node.js applications to MongoDB using Mongoose and wrote basic schema validation.",
        ],
        "junior": [
            "Developed Node.js microservices with Fastify, JWT authentication, and PostgreSQL via node-postgres.",
            "Implemented Bull-based job queues with Redis for background task processing and scheduled jobs.",
            "Wrote unit tests with Jest and Supertest for Node.js Express APIs, covering happy-path and error cases.",
            "Built Node.js middleware for request validation using Zod, rejecting malformed payloads before controller logic.",
            "Used Node.js streams for large file uploads and CSV processing without buffering entire files in memory.",
        ],
        "mid": [
            "Built Node.js event-driven services with EventEmitter and Transform streams, processing 100GB+ of log data daily.",
            "Designed GraphQL API with Node.js, Apollo Server, and DataLoader, eliminating N+1 query problems.",
            "Profiled Node.js CPU hotspots with clinic.js and flamegraphs, reducing p99 latency from 800ms to 90ms.",
            "Implemented sliding-window rate limiting in Node.js using Redis atomic operations to protect public APIs.",
            "Migrated Node.js codebase from CommonJS to ES Modules, enabling native top-level await and tree shaking.",
        ],
        "senior": [
            "Architected a Node.js backend handling 300K concurrent WebSocket connections with horizontal scaling on Kubernetes.",
            "Defined Node.js service template with OpenTelemetry tracing, structured logging, and health-check standards.",
            "Built a Node.js BFF layer aggregating 8 microservices into optimised, client-tailored responses.",
            "Led Node.js upgrade strategy from v14 to v20 LTS across 25 services with automated compatibility tests.",
        ],
    },

    "fastapi": {
        "fresher": [
            "Built FastAPI REST APIs with automatic OpenAPI docs, Pydantic request/response validation, and SQLite via SQLAlchemy.",
            "Used FastAPI path parameters, query params, and request body schemas to design clean, self-documenting endpoints.",
            "Integrated FastAPI with SQLite using SQLAlchemy ORM and Alembic migrations for schema versioning.",
        ],
        "junior": [
            "Developed async FastAPI microservices with SQLAlchemy + asyncpg, JWT auth middleware, and background tasks.",
            "Implemented FastAPI dependency injection for shared database sessions, auth checks, and request logging.",
            "Wrote pytest tests for FastAPI endpoints using TestClient, covering auth flows and validation edge cases.",
            "Used FastAPI background tasks for non-blocking email sends and webhook delivery after API responses.",
            "Deployed FastAPI with uvicorn behind Nginx, configuring workers and keep-alive settings for production load.",
        ],
        "mid": [
            "Built high-performance async FastAPI services handling 20K+ requests/second with Redis caching and PgBouncer pooling.",
            "Deployed FastAPI ML inference endpoints serving real-time predictions at <30ms median latency on AWS ECS.",
            "Implemented streaming responses in FastAPI using Server-Sent Events for long-running ML inference tasks.",
            "Built a FastAPI middleware stack for request ID propagation, structured logging, and distributed tracing.",
            "Designed versioned FastAPI routers with deprecation warnings, enabling backward-compatible API evolution.",
        ],
        "senior": [
            "Architected a FastAPI ML serving platform with model versioning, A/B testing, and auto-scaling on AWS ECS.",
            "Defined FastAPI service template with OpenTelemetry, Pydantic v2, and Alembic used across 10 data services.",
            "Built a multi-tenant FastAPI gateway with per-tenant rate limiting, auth, and request routing.",
        ],
    },

    "django": {
        "fresher": [
            "Built Django web applications using the MTV architecture, Django ORM, and class-based views.",
            "Implemented Django admin customisation and user authentication using Django's built-in auth framework.",
            "Used Django forms and ModelForm for input validation and CSRF-protected POST handling.",
        ],
        "junior": [
            "Developed Django REST Framework APIs with ModelViewSets, serialisers, and token-based authentication.",
            "Implemented Celery tasks for asynchronous email sending, PDF generation, and nightly report jobs.",
            "Wrote Django test cases using TestCase and APITestCase, covering model methods and API endpoints.",
            "Used Django signals to decouple side effects (audit logs, notifications) from core business logic.",
            "Optimised Django querysets with select_related and prefetch_related, reducing page-level SQL queries from 50 to 4.",
        ],
        "mid": [
            "Optimised Django application performance by 70% through query analysis, Redis caching, and database indexing.",
            "Built a multi-tenant Django SaaS platform with schema-per-tenant isolation using django-tenants.",
            "Implemented Django Channels for WebSocket support, enabling real-time dashboard updates for 2K+ concurrent users.",
            "Used Django migrations strategically for zero-downtime schema changes on tables with 50M+ rows.",
            "Built custom Django management commands for data backfills and scheduled maintenance tasks.",
        ],
        "senior": [
            "Architected a Django platform serving 500K monthly users with read replicas, Elasticsearch, and CDN-backed media.",
            "Led Django 2.x to 4.x upgrade across a 150K-line codebase, removing deprecated APIs and adding async views.",
            "Designed a shared Django app package (authentication, permissions, audit) reused across 5 internal products.",
        ],
    },

    # ── DevOps & CI/CD ────────────────────────────────────────────────────────

    "jenkins": {
        "fresher": [
            "Configured Jenkins freestyle jobs and pipelines for automated build and test execution on code commits.",
            "Set up Jenkins webhook triggers from GitHub to run CI checks on every pull request.",
            "Used Jenkins Blue Ocean UI to visualise pipeline stages and diagnose build failures.",
        ],
        "junior": [
            "Built declarative Jenkins pipelines with parallel stages for lint, unit tests, and Docker image builds.",
            "Reduced pipeline execution time by 40% through stage parallelisation and dependency caching in Jenkins.",
            "Integrated SonarQube quality gates into Jenkins pipelines, blocking merges on coverage drops.",
            "Configured Jenkins agents with Docker-in-Docker for isolated, reproducible build environments.",
        ],
        "mid": [
            "Designed a Jenkins shared library for reusable pipeline steps across 20+ microservices, standardising CI/CD.",
            "Implemented Jenkins blue-green deployment logic, reducing deployment downtime from 15 minutes to zero.",
            "Built Jenkins pipeline templates with automatic rollback on smoke-test failure post-deployment.",
            "Secured Jenkins with RBAC, credential management, and audit logs, passing quarterly security review.",
            "Optimised Jenkins agent pool utilisation by 35% through dynamic provisioning on Kubernetes.",
        ],
        "senior": [
            "Architected an organisation-wide Jenkins CI/CD platform managing 200+ pipelines with RBAC and Kubernetes agents.",
            "Led migration from scripted Jenkins pipelines to declarative shared library, cutting pipeline authoring time by 70%.",
            "Defined SLA for build pipelines (<8 min for main branch) and implemented auto-scaling agents to meet it consistently.",
        ],
    },

    "github actions": {
        "fresher": [
            "Configured GitHub Actions workflows for automated linting and unit testing on every pull request.",
            "Used pre-built Actions (actions/checkout, actions/setup-node) to assemble CI workflows without custom scripting.",
            "Added status checks to branch protection rules, preventing merges when Actions workflows fail.",
        ],
        "junior": [
            "Built GitHub Actions CI/CD pipelines with Docker build, push to ECR, and deploy to AWS ECS on merge to main.",
            "Used matrix builds to run tests across multiple runtime versions and OS combinations in parallel.",
            "Implemented workflow caching for npm/pip dependencies, reducing average CI run time from 12 minutes to 4.",
            "Used GitHub Actions environments with manual approval gates for production deployments.",
        ],
        "mid": [
            "Designed reusable composite Actions and workflow templates, reducing per-repo CI setup from 2 days to 30 minutes.",
            "Built GitHub Actions release automation with semantic versioning, changelog generation, and PyPI/npm publishing.",
            "Implemented OIDC-based AWS credential federation in Actions, eliminating long-lived IAM keys from CI.",
            "Set up concurrency groups and cancel-in-progress to prevent redundant CI runs on rapid push sequences.",
        ],
        "senior": [
            "Standardised GitHub Actions CI/CD across 50+ repositories with centralised OIDC auth and cost monitoring.",
            "Built an internal GitHub Actions marketplace with 15 reusable actions covering security scanning and deployment.",
            "Defined branch strategy and PR workflow standards adopted across a 200-developer engineering organisation.",
        ],
    },

    "docker": {
        "fresher": [
            "Containerised applications with Docker, writing Dockerfiles and managing containers using Docker CLI commands.",
            "Used Docker Compose to run multi-container local environments with app, database, and cache services.",
            "Pulled and ran official Docker images from Docker Hub for development dependencies (Postgres, Redis, Nginx).",
            "Tagged and pushed Docker images to Docker Hub as part of academic deployment exercises.",
        ],
        "junior": [
            "Wrote multi-stage Dockerfiles reducing final image sizes by 70%, with non-root users and Trivy vulnerability scanning.",
            "Managed Docker Compose stacks for local development and integration-test environments across a team of 6.",
            "Implemented Docker health checks and restart policies for reliable local service orchestration.",
            "Built Docker-based CI environments ensuring build reproducibility across developer machines and CI agents.",
            "Used Docker volumes and bind mounts to separate code, config, and persistent data cleanly.",
        ],
        "mid": [
            "Designed Docker image build strategy with layer caching, reducing CI build time from 12 minutes to 3.",
            "Implemented Docker security hardening — distroless base images, read-only filesystems, and non-root users.",
            "Used Docker BuildKit secrets mount to inject credentials during build without leaking them into image layers.",
            "Standardised Docker Compose overrides for dev/test/prod, eliminating environment-specific configuration drift.",
            "Profiled Docker image sizes with dive, reducing a 1.8GB image to 180MB through layer optimisation.",
        ],
        "senior": [
            "Defined Docker golden base images and security standards for a 100-service microservices platform.",
            "Led Docker-to-containerd migration on Kubernetes nodes, maintaining workload continuity across 500+ containers.",
            "Built automated Docker image scanning pipeline with fail-fast on critical CVEs, enforced across all CI builds.",
        ],
    },

    "kubernetes": {
        "fresher": [
            "Deployed containerised applications to a Kubernetes cluster using kubectl apply and basic Deployment manifests.",
            "Used kubectl commands (get, describe, logs, exec) to inspect running pods and diagnose deployment issues.",
            "Created Kubernetes Services to expose Deployments internally (ClusterIP) and externally (LoadBalancer).",
        ],
        "junior": [
            "Configured Kubernetes Deployments, Services, ConfigMaps, Secrets, and Ingress for multi-service applications.",
            "Implemented HPA (Horizontal Pod Autoscaler) to scale pods based on CPU and memory metrics automatically.",
            "Used Kubernetes liveness and readiness probes to enable automatic unhealthy-pod replacement.",
            "Managed namespaces for environment isolation (dev, staging, prod) within a shared cluster.",
            "Wrote Helm charts to package and version Kubernetes application deployments for repeatable installs.",
        ],
        "mid": [
            "Designed Kubernetes RBAC policies, NetworkPolicies, and ResourceQuotas for multi-tenant cluster isolation.",
            "Implemented rolling and canary deployments with Argo Rollouts, achieving zero-downtime releases.",
            "Reduced Kubernetes infrastructure cost by 35% through resource right-sizing and Spot instance scheduling.",
            "Built Kubernetes admission webhooks for policy enforcement — image registry allowlists and label validation.",
            "Tuned pod disruption budgets and topology spread constraints for high availability across availability zones.",
        ],
        "senior": [
            "Architected a multi-region EKS platform with GitOps (ArgoCD), service mesh (Istio), and centralised observability.",
            "Led Kubernetes cluster upgrade strategy for production clusters running 500+ workloads with zero downtime.",
            "Built a Kubernetes platform abstraction reducing time-to-deploy for new services from 2 weeks to 4 hours.",
            "Defined cluster security baseline — Pod Security Standards, OPA Gatekeeper policies — across 8 clusters.",
        ],
    },

    "terraform": {
        "fresher": [
            "Provisioned AWS infrastructure (VPC, EC2, S3, RDS) using Terraform HCL, managing resources as versioned code.",
            "Used Terraform plan and apply workflow to preview and apply changes, avoiding manual console operations.",
            "Understood Terraform state management and the importance of state locking in team environments.",
        ],
        "junior": [
            "Created reusable Terraform modules for VPC, ECS, and RDS, shared across dev, staging, and prod environments.",
            "Configured Terraform remote state in S3 with DynamoDB locking for safe concurrent team usage.",
            "Used Terraform workspaces to manage parallel environment configurations from a single module set.",
            "Implemented Terraform variable validation and output documentation for self-service module consumption.",
        ],
        "mid": [
            "Designed a Terraform module library reducing new environment provisioning from 2 weeks to 2 hours.",
            "Implemented Terraform Sentinel policies for compliance-as-code, enforcing encryption and tagging across 15 AWS accounts.",
            "Integrated Terraform Cloud into CI pipelines with speculative plans on PRs and auto-apply on merge.",
            "Migrated manually created AWS resources into Terraform state using terraform import with zero downtime.",
            "Built Terraform testing with Terratest, catching module regressions before they reached production.",
        ],
        "senior": [
            "Architected multi-account AWS infrastructure with Terraform and Control Tower managing 50+ accounts.",
            "Defined Terraform contribution workflow and module versioning strategy across a 40-engineer platform team.",
            "Built a Terraform drift detection pipeline alerting on manual AWS console changes within 5 minutes.",
        ],
    },

    # ── Cloud ─────────────────────────────────────────────────────────────────

    "aws": {
        "fresher": [
            "Deployed web applications to AWS EC2 and stored static assets on S3 with CloudFront CDN distribution.",
            "Configured AWS IAM users, groups, and policies following least-privilege principles for project access.",
            "Used AWS RDS to provision managed PostgreSQL instances, enabling automatic backups and patching.",
            "Set up AWS S3 static website hosting and configured Route 53 DNS for custom domain mapping.",
        ],
        "junior": [
            "Provisioned AWS infrastructure (EC2, RDS, S3, Lambda, API Gateway) for production web application backends.",
            "Configured VPCs with public/private subnets, NAT gateways, and security groups for multi-tier deployments.",
            "Deployed containerised apps on AWS ECS Fargate with ALB and auto-scaling target-tracking policies.",
            "Implemented CloudWatch alarms and dashboards for resource utilisation and application error-rate monitoring.",
            "Used AWS Secrets Manager for credential rotation and Parameter Store for environment configuration.",
        ],
        "mid": [
            "Designed serverless architectures on AWS (Lambda, API Gateway, DynamoDB), reducing operational cost by 60%.",
            "Optimised AWS spend by 40% through Reserved Instances, S3 lifecycle policies, and EC2 rightsizing.",
            "Implemented AWS WAF and Shield rules, blocking 99.8% of malicious traffic without false-positive impact.",
            "Architected multi-AZ RDS with read replicas, achieving database failover in under 60 seconds.",
            "Built data pipelines on AWS (Kinesis, Glue, Athena, S3) processing 5TB+ of event data daily.",
        ],
        "senior": [
            "Architected a multi-region AWS platform with Route 53 failover, RDS Multi-AZ, and RPO < 5 minutes.",
            "Led AWS Well-Architected reviews across 10 product teams, improving security posture and saving $200K/year.",
            "Designed AWS Service Control Policies and guardrails ensuring compliance across a 30-account organisation.",
            "Built a cloud cost observability platform on AWS using the Cost Explorer API, cutting untagged resource spend by 85%.",
        ],
    },

    "azure": {
        "fresher": [
            "Deployed applications to Azure App Service and managed resources through the Azure Portal and CLI.",
            "Stored application data in Azure Blob Storage and configured access tiers for cost-efficient retrieval.",
            "Used Azure DevOps Boards for sprint planning and Azure Repos for source control in academic projects.",
        ],
        "junior": [
            "Provisioned Azure resources (VMs, SQL Database, Function Apps, Service Bus) using ARM templates and Bicep.",
            "Built Azure DevOps CI/CD pipelines with build agents, approval gates, and environment-specific deployments.",
            "Configured Azure AD App Registrations for OAuth2/OIDC authentication in web applications.",
            "Used Azure Monitor and Application Insights for distributed tracing and alerting across .NET services.",
        ],
        "mid": [
            "Designed an AKS platform with Azure DevOps GitOps, RBAC, and Azure Monitor integration for 20 microservices.",
            "Implemented Azure Service Bus messaging for event-driven microservices processing 500K messages/day.",
            "Used Azure Policy and Blueprints to enforce compliance standards across 10 subscriptions.",
            "Optimised Azure costs by 35% through Reserved VM Instances, Azure Hybrid Benefit, and right-sizing.",
        ],
        "senior": [
            "Architected an Azure landing zone with Management Groups, Policy, and RBAC for 30+ product teams.",
            "Led Azure migration from on-premises, moving 200 VMs using Azure Migrate with a 6-month delivery timeline.",
            "Defined Azure networking standards — hub-spoke topology, Private Endpoints, NSG rules — across the organisation.",
        ],
    },

    "gcp": {
        "fresher": [
            "Deployed applications to Google Cloud Run and stored data in Cloud Storage and Firestore.",
            "Used BigQuery for SQL-based analytics on public datasets as part of data engineering exercises.",
        ],
        "junior": [
            "Built data pipelines with GCP BigQuery, Cloud Storage, and Dataflow for batch analytics workloads.",
            "Deployed containerised apps to GKE and configured Cloud Load Balancing and Cloud Armor WAF rules.",
            "Used Cloud Pub/Sub for event streaming and Cloud Functions for serverless event processing.",
        ],
        "mid": [
            "Designed a GCP data platform with BigQuery, Pub/Sub, and Cloud Composer (Airflow) processing 10TB+ daily.",
            "Deployed ML models to Vertex AI, serving 50K+ predictions/day with A/B testing and canary rollouts.",
            "Optimised BigQuery costs by 55% through partitioned tables, materialised views, and slot reservation.",
            "Built a GCP data mesh with separate BigQuery datasets per domain, governed via Data Catalog and IAM.",
        ],
        "senior": [
            "Architected a GCP analytics platform with BigQuery, Looker, and dbt replacing a legacy warehouse, saving $500K/year.",
            "Led GCP landing zone design with shared VPC, Private Service Connect, and Organisation Policy constraints.",
        ],
    },

    # ── Databases ─────────────────────────────────────────────────────────────

    "mysql": {
        "fresher": [
            "Designed normalised MySQL schemas with primary keys, foreign keys, and integrity constraints for academic projects.",
            "Wrote SQL queries using SELECT, JOIN, GROUP BY, HAVING, and subqueries for data retrieval.",
            "Used MySQL Workbench to design ER diagrams and visually manage schema changes.",
            "Implemented basic indexes on frequently queried columns and observed performance improvements with EXPLAIN.",
        ],
        "junior": [
            "Optimised slow MySQL queries using EXPLAIN, adding composite indexes and rewriting correlated subqueries as JOINs.",
            "Implemented MySQL stored procedures and triggers to encapsulate business rules at the database layer.",
            "Managed schema migrations with Flyway, maintaining a versioned and auditable migration history.",
            "Configured MySQL replication (primary/replica) for read-scaling and basic failover in staging.",
        ],
        "mid": [
            "Designed MySQL architecture with read replicas, ProxySQL connection pooling, and table partitioning for 10M+ row tables.",
            "Performed MySQL performance tuning — InnoDB buffer pool sizing, query cache analysis, slow query log review.",
            "Implemented zero-downtime schema changes using gh-ost on live tables with 100M+ rows.",
            "Migrated from MySQL 5.7 to 8.0, adopting window functions and JSON columns to simplify reporting queries.",
            "Built MySQL backup and point-in-time recovery strategy achieving RTO of 15 minutes for production databases.",
        ],
        "senior": [
            "Led MySQL to Aurora migration for a 500GB production database achieving zero-downtime cutover.",
            "Designed MySQL sharding strategy distributing 2TB of user data across 8 shards with transparent routing.",
            "Defined MySQL DBA standards — naming conventions, index policies, charset standards — across a 20-service platform.",
        ],
    },

    "postgresql": {
        "fresher": [
            "Designed PostgreSQL schemas with normalised tables, foreign keys, and CHECK constraints for academic projects.",
            "Used psql CLI and pgAdmin to write and debug SQL queries against PostgreSQL databases.",
            "Practised PostgreSQL DDL — CREATE TABLE, ALTER TABLE, CREATE INDEX — for iterative schema development.",
        ],
        "junior": [
            "Used PostgreSQL advanced features — CTEs, window functions, JSONB columns, and full-text search — for complex queries.",
            "Configured pgBouncer connection pooling, reducing connection overhead by 70% under peak load.",
            "Wrote PL/pgSQL functions and triggers for server-side business logic and audit logging.",
            "Managed PostgreSQL migrations with Alembic, maintaining an auditable schema change history.",
        ],
        "mid": [
            "Designed PostgreSQL schema with range partitioning and partial indexes, improving query performance by 85% on 500M+ rows.",
            "Implemented PostgreSQL logical replication for zero-downtime schema migrations and live data synchronisation.",
            "Used EXPLAIN ANALYZE and pg_stat_statements to identify and fix top-10 slow queries across the application.",
            "Implemented row-level security (RLS) policies for multi-tenant data isolation without application-layer filtering.",
            "Built full-text search with tsvector/tsquery and GIN indexes, replacing an Elasticsearch cluster for simpler search needs.",
        ],
        "senior": [
            "Architected a multi-region PostgreSQL setup with Patroni HA and Pgpool-II achieving 99.99% database availability.",
            "Led PostgreSQL 12 to 15 upgrade, enabling parallel query improvements that cut analytics query time by 50%.",
            "Designed PostgreSQL sharding with Citus for a multi-tenant SaaS handling 10M+ rows per tenant.",
        ],
    },

    "mongodb": {
        "fresher": [
            "Designed MongoDB document schemas using embedded arrays and references for flexible, schema-less data models.",
            "Performed CRUD operations and aggregation queries using Mongoose ODM in Node.js academic projects.",
            "Used MongoDB Compass to visually inspect collections and run explain plans on slow queries.",
            "Modelled one-to-many relationships using embedded documents vs. references based on read/write access patterns.",
        ],
        "junior": [
            "Built MongoDB aggregation pipelines with $match, $group, $lookup, and $project for business reporting.",
            "Implemented MongoDB Atlas Search for full-text search with relevance scoring across document collections.",
            "Created compound indexes tuned to frequent query patterns, validated with explain() output.",
            "Used MongoDB Change Streams to trigger real-time processing on document inserts and updates.",
        ],
        "mid": [
            "Optimised MongoDB query performance with compound indexes and projection, reducing average query time by 65%.",
            "Designed a MongoDB sharded cluster for horizontal scaling, supporting 100GB+ datasets at sub-10ms reads.",
            "Implemented MongoDB multi-document transactions for atomicity in order and inventory management workflows.",
            "Built MongoDB Atlas data archive policy, tiering cold data to object storage and cutting storage cost by 60%.",
            "Migrated a relational schema to MongoDB document model, redesigning for read-optimised embedded patterns.",
        ],
        "senior": [
            "Architected MongoDB multi-region replica set with automated failover supporting 5M+ document writes/day.",
            "Defined MongoDB schema design standards and index governance for a 15-service platform.",
            "Led MongoDB 4.x to 6.x upgrade, adopting time-series collections for IoT sensor data and reducing storage by 70%.",
        ],
    },

    "redis": {
        "fresher": [
            "Used Redis as a session cache and API response cache in web applications, reducing database reads.",
            "Practised Redis data structures — strings, hashes, lists, sets, sorted sets — through CLI exercises.",
            "Implemented Redis TTL-based cache expiration to ensure cache freshness for time-sensitive data.",
        ],
        "junior": [
            "Implemented a Redis caching layer reducing database read load by 70% and improving API response time by 5×.",
            "Used Redis Pub/Sub for real-time notifications and Redis Streams for reliable event queuing between services.",
            "Built a distributed rate limiter using Redis atomic INCR+EXPIRE operations to protect public APIs.",
            "Implemented Redis-backed session store for stateless horizontal scaling of web application servers.",
        ],
        "mid": [
            "Designed a Redis Cluster handling 500K operations/second for distributed caching and job queuing.",
            "Implemented Redis Lua scripts for atomic multi-key operations, preventing race conditions in inventory management.",
            "Used Redis Sorted Sets for real-time leaderboards and time-windowed analytics with O(log N) operations.",
            "Built a Redis-based distributed lock using the Redlock algorithm for coordinating across 6 microservice instances.",
            "Migrated from Memcached to Redis Cluster, gaining persistence, Pub/Sub, and Lua scripting capabilities.",
        ],
        "senior": [
            "Architected a Redis Enterprise cluster replacing multiple caching layers, reducing latency by 80% and saving $150K/year.",
            "Designed Redis data modelling standards and eviction policies preventing cache stampedes under traffic spikes.",
            "Led Redis 6 to 7 upgrade enabling ACLs, client-side caching, and multi-threading for I/O-bound workloads.",
        ],
    },

    # ── Tools & Practices ─────────────────────────────────────────────────────

    "git": {
        "fresher": [
            "Used Git for version control — branching, committing, rebasing, and resolving merge conflicts in team projects.",
            "Followed conventional commit message standards (feat, fix, chore) for readable, parseable project history.",
            "Created and reviewed pull requests on GitHub, incorporating feedback through iterative commits.",
        ],
        "junior": [
            "Applied Git Flow branching strategy with feature, release, and hotfix branches for structured team development.",
            "Used interactive rebase (git rebase -i) to squash and clean up commit history before merging to main.",
            "Set up Git hooks (pre-commit, commit-msg) with Husky to enforce linting and commit format automatically.",
            "Used git bisect to binary-search a performance regression across 200 commits in under 20 minutes.",
        ],
        "mid": [
            "Managed complex Git repository migrations, large file storage (Git LFS), and monorepo structuring for multi-team orgs.",
            "Designed branch protection strategies and merge queue policies ensuring CI passes before every merge.",
            "Diagnosed and recovered corrupted Git histories using git reflog and low-level plumbing commands.",
        ],
        "senior": [
            "Defined Git workflow and inner-source contribution model adopted across a 200-engineer engineering organisation.",
            "Built Git-based developer workflow tooling (CLI scripts, GitHub Apps) automating 80% of routine branch management.",
            "Designed monorepo Git strategy with sparse checkout and partial clone, reducing clone time by 90%.",
        ],
    },

    "github": {
        "fresher": [
            "Collaborated on GitHub with pull requests, code reviews, and issue tracking for academic team projects.",
            "Used GitHub Projects and Issues for sprint planning, bug tracking, and feature prioritisation.",
        ],
        "junior": [
            "Managed GitHub repository settings, branch protection rules, and CODEOWNERS for structured team workflows.",
            "Configured Dependabot for automated dependency security updates across Node.js and Python projects.",
            "Used GitHub Discussions for async technical RFC reviews, replacing long email threads.",
            "Set up GitHub Environments with required reviewers for controlled production deployments.",
        ],
        "mid": [
            "Administered GitHub Enterprise with SSO, audit logging, secret scanning, and IP allow-list policies.",
            "Built internal GitHub Apps for automating PR labelling, stale branch cleanup, and deployment notifications.",
            "Implemented GitHub Advanced Security (code scanning, secret scanning) across 30 repositories.",
        ],
        "senior": [
            "Led GitHub platform strategy for 500 developers including an InnerSource programme and developer tooling.",
            "Defined GitHub organisation governance — team structure, repo naming, access tiers — for a fast-growing eng org.",
            "Built a GitHub App-based developer portal surfacing PR status, CI health, and deployment state in one dashboard.",
        ],
    },

    "rest api": {
        "fresher": [
            "Consumed REST APIs using Fetch and Axios in frontend projects, handling JSON responses and error states.",
            "Built basic REST APIs with CRUD endpoints following HTTP verb conventions (GET, POST, PUT, DELETE).",
            "Used Postman to manually test REST API endpoints and share collections with teammates.",
            "Implemented HTTP status codes correctly (200, 201, 400, 401, 404, 500) in academic API projects.",
        ],
        "junior": [
            "Designed RESTful APIs following best practices — versioning, pagination, error codes, and OpenAPI documentation.",
            "Implemented JWT Bearer token authentication and refresh token rotation in REST API services.",
            "Built REST API clients with retry logic and exponential backoff for resilient third-party integrations.",
            "Wrote contract tests using Pact, catching breaking API changes before they reached staging.",
        ],
        "mid": [
            "Designed REST APIs with rate limiting, conditional requests (ETag), and cursor-based pagination for high-traffic services.",
            "Built API gateways with request routing, auth aggregation, and response transformation across 8 microservices.",
            "Defined REST API versioning strategy (URI versioning + deprecation headers) supporting 3 active major versions.",
            "Implemented REST API observability — request tracing, latency percentiles, error budgets — monitored in Grafana.",
        ],
        "senior": [
            "Defined REST API design standards and governance for a platform with 100+ public endpoints used by 3rd-party partners.",
            "Built an API developer portal with interactive docs, SDK generation, and changelog notifications for 500+ consumers.",
            "Led an API deprecation programme retiring 30 legacy endpoints with zero partner-impacting incidents.",
        ],
    },

    "graphql": {
        "fresher": [
            "Queried GraphQL APIs using Apollo Client in React applications, writing queries, mutations, and fragments.",
            "Understood GraphQL SDL — types, queries, mutations, and subscriptions — and designed a schema for academic projects.",
        ],
        "junior": [
            "Built GraphQL APIs using Apollo Server with custom resolvers, schema stitching, and DataLoader for batched queries.",
            "Implemented GraphQL subscriptions over WebSocket for real-time data updates in a React dashboard.",
            "Used persisted queries and query depth limits to prevent expensive ad-hoc queries in production.",
        ],
        "mid": [
            "Designed a federated GraphQL architecture with Apollo Federation across 6 microservices with a unified schema.",
            "Optimised GraphQL query performance with DataLoader batching and persisted queries, reducing resolver calls by 80%.",
            "Built GraphQL query complexity analysis to reject deeply nested queries that would cause N+1 database load.",
            "Implemented GraphQL schema field deprecation workflow with automated breaking-change detection in CI.",
        ],
        "senior": [
            "Architected a GraphQL platform handling 10M+ queries/day with a schema registry and SLA monitoring.",
            "Defined GraphQL schema design guidelines and review process ensuring backward compatibility across 8 consumer teams.",
            "Built a GraphQL gateway replacing 12 REST BFF endpoints, reducing client-server round trips by 60%.",
        ],
    },

    "agile": {
        "fresher": [
            "Participated in Agile Scrum ceremonies — standups, sprint planning, reviews, and retrospectives — in team projects.",
            "Used Jira to manage backlog items, track sprint progress, and log bug reports with reproducible steps.",
            "Applied story pointing (Fibonacci scale) to estimate effort and identify high-risk stories for early de-risking.",
        ],
        "junior": [
            "Delivered features in 2-week Agile sprints using Jira for backlog grooming, velocity tracking, and burn-down charts.",
            "Participated in backlog refinement, breaking epics into sprint-sized stories with clear acceptance criteria.",
            "Used Confluence to document retrospective outcomes and track action items to closure.",
            "Collaborated in cross-functional Agile teams (dev, QA, design), reducing feature cycle time by 30%.",
        ],
        "mid": [
            "Facilitated Scrum ceremonies as tech lead, maintaining sprint velocity and improving delivery predictability by 40%.",
            "Coached the team on Agile practices, reducing sprint carryover from 30% to under 8% over two quarters.",
            "Introduced definition-of-done checklists and automated CI gates, eliminating last-minute regression discoveries.",
            "Ran quarterly OKR planning sessions aligning team sprint goals to company-level objectives.",
        ],
        "senior": [
            "Drove Agile transformation for 4 engineering teams, introducing OKRs, team topologies, and continuous deployment.",
            "Established an Agile coaching programme training 15 tech leads in facilitation and metrics-driven retrospectives.",
            "Designed a cross-team dependency board and quarterly roadmap process eliminating inter-team delivery blockers.",
        ],
    },

    "machine learning": {
        "fresher": [
            "Built supervised ML models (classification, regression) using scikit-learn on academic datasets with cross-validation.",
            "Applied data preprocessing — imputation, encoding, feature scaling — and evaluated models with precision, recall, F1.",
            "Used GridSearchCV and RandomizedSearchCV for hyperparameter tuning, improving model accuracy by 12%.",
            "Implemented a full ML project pipeline: EDA, feature engineering, model training, evaluation, and Jupyter reporting.",
            "Applied dimensionality reduction (PCA, t-SNE) to visualise high-dimensional datasets and identify clusters.",
            "Compared model performance (logistic regression, decision tree, random forest, SVM) on a classification benchmark.",
        ],
        "junior": [
            "Developed end-to-end ML pipelines with scikit-learn Pipelines and MLflow for experiment tracking and versioning.",
            "Implemented ensemble methods (XGBoost, LightGBM, Random Forest) achieving 90%+ accuracy on structured datasets.",
            "Built feature stores for reusable, versioned feature sets shared across training and inference pipelines.",
            "Deployed scikit-learn models as REST APIs using FastAPI, serving predictions with <50ms median latency.",
            "Used SHAP values for model interpretability, communicating feature importance to non-technical stakeholders.",
        ],
        "mid": [
            "Designed production ML models with automated retraining, drift detection, and A/B testing infrastructure.",
            "Reduced model inference latency by 60% through quantisation, ONNX export, and batch-prediction caching.",
            "Built a model monitoring system tracking feature drift and prediction distribution, alerting on anomalies within 1 hour.",
            "Led ML code reviews establishing reproducibility standards — seed fixing, data versioning, experiment logging.",
            "Implemented active learning loops reducing annotation cost by 40% while maintaining model accuracy targets.",
        ],
        "senior": [
            "Architected an MLOps platform supporting 20+ production models with automated CI/CD, monitoring, and rollback.",
            "Led research-to-production ML pipeline reducing average model deployment time from 3 months to 2 weeks.",
            "Defined ML system design standards — training data governance, model cards, inference SLAs — across the org.",
            "Built a feature platform serving 500+ features at <5ms p99 latency for real-time ML inference.",
        ],
    },

    "deep learning": {
        "fresher": [
            "Built neural networks with TensorFlow/Keras for image classification and sentiment analysis on academic datasets.",
            "Designed CNN architectures for image recognition, applying batch normalisation and dropout regularisation.",
            "Implemented LSTM and GRU networks for sequence modelling on time-series and NLP tasks.",
            "Applied data augmentation (rotation, flipping, cropping) to improve model generalisation on small datasets.",
            "Tracked deep learning experiments with TensorBoard, monitoring training/validation loss and learning rate schedules.",
        ],
        "junior": [
            "Fine-tuned pre-trained models (ResNet, VGG, BERT) using transfer learning, achieving competitive accuracy with limited data.",
            "Implemented training pipelines with early stopping, learning rate scheduling, and mixed-precision training.",
            "Built NLP pipelines with Hugging Face Transformers for text classification, NER, and question answering.",
            "Used PyTorch DataLoader with custom Dataset classes for efficient batched training on domain-specific data.",
        ],
        "mid": [
            "Designed custom transformer models for NLP tasks, processing 1M+ text samples with 94%+ accuracy.",
            "Optimised deep learning inference using TensorRT and ONNX quantisation, reducing prediction time by 75%.",
            "Built multi-modal deep learning pipelines combining image and text features for product recommendation.",
            "Implemented continual learning strategies (EWC, replay buffers) preventing catastrophic forgetting in production.",
        ],
        "senior": [
            "Led a deep learning research team delivering 3 production models in vision and NLP serving 500K+ daily users.",
            "Designed distributed training infrastructure with PyTorch DDP and FSDP, cutting training time from 3 days to 6 hours.",
            "Established model evaluation frameworks and red-teaming practices to detect bias and failure modes before production.",
        ],
    },

    "sql": {
        "fresher": [
            "Wrote SQL queries using SELECT, JOINs, GROUP BY, HAVING, subqueries, and aggregate functions for data retrieval.",
            "Designed normalised relational schemas (3NF) with primary keys, foreign keys, and referential integrity constraints.",
            "Used SQL window functions (ROW_NUMBER, RANK) to solve ranking and running-total problems in academic exercises.",
            "Created and managed indexes in SQL to observe query performance differences with EXPLAIN output.",
        ],
        "junior": [
            "Wrote complex SQL with CTEs, recursive queries, and window functions (LAG, LEAD, NTILE) for business reporting.",
            "Optimised slow SQL queries using EXPLAIN/EXPLAIN ANALYZE plans and appropriate indexing strategies.",
            "Implemented SQL-based audit logging with trigger functions capturing change history on critical tables.",
            "Used SQL transactions and savepoints to ensure atomicity across multi-step data modification workflows.",
        ],
        "mid": [
            "Designed SQL schemas for 100M+ row tables with partitioning, materialised views, and covering indexes.",
            "Built SQL-based ETL pipelines incrementally loading 50GB+ datasets using merge/upsert patterns.",
            "Reduced average reporting query time by 90% through query refactoring, index tuning, and materialised views.",
            "Implemented SQL query performance monitoring with slow query logs and automated alerting on threshold breaches.",
        ],
        "senior": [
            "Led SQL optimisation initiative reducing average report generation from 45 minutes to under 2 minutes.",
            "Defined SQL coding standards — naming conventions, index policies, anti-patterns — adopted across 8 data teams.",
            "Designed SQL data warehouse schema (star/snowflake) replacing a normalised OLTP schema, cutting BI query time by 80%.",
        ],
    },

    "html": {
        "fresher": [
            "Built semantic HTML pages with correct heading hierarchy, landmark roles, and ARIA attributes for accessibility.",
            "Used HTML5 elements (article, section, nav, header, footer) to improve document structure and SEO.",
            "Created HTML forms with input validation, fieldset grouping, and accessible label associations.",
        ],
        "junior": [
            "Developed responsive HTML layouts tested across Chrome, Firefox, and Safari for cross-browser compatibility.",
            "Implemented HTML performance optimisations — lazy image loading, srcset for responsive images, and preload hints.",
            "Audited HTML for WCAG 2.1 AA accessibility compliance using axe-core and fixed 30+ violations.",
        ],
        "mid": [
            "Implemented Critical CSS inlining and resource hints (preconnect, prefetch), achieving LCP < 1.5s.",
            "Built HTML email templates compatible with Outlook, Gmail, and Apple Mail using table-based layouts.",
            "Defined HTML component standards and accessible patterns for a design system used across 8 product teams.",
        ],
        "senior": [
            "Led HTML/CSS component standards and accessibility guidelines adopted across a multi-team design system.",
            "Implemented automated HTML accessibility testing in CI, catching 95% of WCAG violations before code review.",
        ],
    },

    "css": {
        "fresher": [
            "Styled web applications using CSS Flexbox and Grid, applying mobile-first responsive design with media queries.",
            "Used CSS custom properties (variables) for theme tokens enabling consistent colour and spacing across pages.",
            "Applied CSS transitions and keyframe animations for smooth, performant UI interactions.",
            "Implemented BEM naming convention for maintainable, conflict-free class names in team projects.",
        ],
        "junior": [
            "Built reusable CSS component systems with custom properties, utility classes, and documented design tokens.",
            "Used CSS Grid for complex two-dimensional layouts (dashboards, calendars) that Flexbox couldn't handle cleanly.",
            "Implemented CSS-in-JS (Styled Components, Emotion) for scoped component styling in React applications.",
            "Reduced CSS bundle size by 60% by auditing and removing unused styles with PurgeCSS.",
        ],
        "mid": [
            "Designed a CSS architecture for a large-scale design system — tokens, themes, utilities — used by 10+ teams.",
            "Eliminated CSS specificity wars by adopting a utility-first approach (Tailwind), reducing custom CSS by 70%.",
            "Implemented CSS container queries enabling component-level responsive behaviour independent of viewport size.",
            "Built CSS performance optimisations — critical path extraction, font subsetting — improving CLS score to 0.",
        ],
        "senior": [
            "Led CSS performance audit eliminating 60KB of unused styles and render-blocking CSS, improving FCP by 40%.",
            "Defined CSS design system token taxonomy and theming architecture supporting light, dark, and high-contrast modes.",
            "Architected CSS component library with Storybook, visual regression tests, and automated a11y audits.",
        ],
    },

    "tailwind": {
        "fresher": [
            "Built responsive UIs using Tailwind CSS utility classes, implementing mobile-first layouts and dark mode support.",
            "Used Tailwind's spacing, colour, and typography scales to maintain visual consistency without custom CSS.",
            "Composed reusable UI patterns by extracting Tailwind class groups into React/Vue components.",
        ],
        "junior": [
            "Configured tailwind.config.js with custom design tokens — brand colours, font stacks, and spacing scales.",
            "Used Tailwind @apply directive to create semantic component classes for frequently repeated utility patterns.",
            "Integrated Tailwind with PostCSS and PurgeCSS, reducing production CSS bundle from 3MB to 12KB.",
            "Built a Tailwind-based dark mode toggle with CSS variables, persisting user preference in localStorage.",
        ],
        "mid": [
            "Designed a Tailwind-based design system with custom plugins, responsive variants, and automated purge configuration.",
            "Migrated a 30K-line custom CSS codebase to Tailwind CSS, cutting CSS maintenance effort by 80%.",
            "Built Tailwind component library with Headless UI for accessible dropdown, modal, and combobox patterns.",
            "Implemented Tailwind JIT mode enabling arbitrary values and variant stacking for complex design requirements.",
        ],
        "senior": [
            "Standardised Tailwind design tokens and component patterns across 8 frontend teams ensuring visual consistency.",
            "Led Tailwind v3 migration across 15 repositories, enabling JIT, container queries, and built-in dark mode.",
        ],
    },

    "linux": {
        "fresher": [
            "Used Linux CLI for file management, process control, text processing (grep, awk, sed), and shell scripting.",
            "Wrote Bash scripts to automate repetitive development tasks — file renaming, log parsing, and test runs.",
            "Managed Linux file permissions, ownership, and symbolic links for project directory setup.",
        ],
        "junior": [
            "Administered Linux servers — user management, cron jobs, systemd services, and log monitoring with journalctl.",
            "Wrote Bash scripts for automated deployments, health checks, and log rotation on production servers.",
            "Used tmux for persistent remote sessions and parallel command execution across multiple servers.",
            "Debugged Linux issues using strace, lsof, netstat, and ss to trace system calls and network connections.",
        ],
        "mid": [
            "Tuned Linux kernel parameters (TCP stack, file descriptors, vm.swappiness) for high-throughput server workloads.",
            "Implemented Linux security hardening — SELinux policies, firewalld rules, SSH hardening, and auditd logging.",
            "Built immutable Linux server images with Packer and Ansible, replacing snowflake servers with reproducible AMIs.",
            "Diagnosed and resolved Linux OOM killer events by profiling memory usage and adjusting application heap limits.",
        ],
        "senior": [
            "Led Linux infrastructure standardisation across 200+ servers using Ansible configuration management and golden AMIs.",
            "Designed Linux server baseline hardening policy (CIS Benchmark Level 2) applied org-wide via automated tooling.",
            "Built Linux performance runbooks for on-call teams covering CPU, memory, disk, and network bottleneck diagnosis.",
        ],
    },
}

# Aliases to normalise user input
ALIASES = {
    "js": "javascript",
    "ts": "typescript",
    "node": "node.js",
    "nodejs": "node.js",
    "springboot": "spring boot",
    "spring": "spring boot",
    "k8s": "kubernetes",
    "k8": "kubernetes",
    "gh actions": "github actions",
    "ci/cd": "jenkins",
    "postgres": "postgresql",
    "pg": "postgresql",
    "mongo": "mongodb",
    "ml": "machine learning",
    "dl": "deep learning",
    "rest": "rest api",
    "restapi": "rest api",
    "rest apis": "rest api",
    "tailwindcss": "tailwind",
    "tailwind css": "tailwind",
    "git/github": "github",
    "css3": "css",
    "html5": "html",
    "agile/scrum": "agile",
    "scrum": "agile",
    "jira": "agile",
    "gcp/bigquery": "gcp",
}
